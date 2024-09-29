import { NextFunction, Request, Response } from "express";
import { sendToaKafkaTopic } from "../../kafka/producer/producer";

export default (dependencie: any) => {
  console.log(dependencie.userUseCase, "dependencies");
  const {
    userUseCase: { unblockUserUsecases },
  } = dependencie;
  const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      const user = await unblockUserUsecases(dependencie).interactor(id);
      const topics = ["user-unblock"];
      const key = user._id.toString();
      const message = {
        _id: user._id,
        name: user.name,
        isBlocked: user.isBlocked,
        password: user.password,
        email: user.email,
      };
      await sendToaKafkaTopic(topics, key, message);
      res
        .status(200)
        .json({ success: true, data: user, message: "user un-blocked" });
    } catch (error: any) {
      next(error);
    }
  };
  return blockUser;
};

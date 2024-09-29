import { NextFunction, Request, Response } from "express";
import { sendToaKafkaTopic } from "../../kafka/producer/producer";

export default (dependencie: any) => {
  console.log(dependencie.userUseCase, "dependencies");

  const {
    userUseCase: { blockuserUsercase },
  } = dependencie;
  const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      const user = await blockuserUsercase(dependencie).interactor(id);
      const topics = ["user-block"];
      const key = user._id.toString();
      const message = {
        _id: user._id,
        name: user.name,
        isBlocked: user.isBlocked,
      };
      await sendToaKafkaTopic(topics, key, message);
      res
        .status(200)
        .json({ success: true, data: user, message: "user blocked" });
    } catch (error: any) {
      next(error);
    }
  };
  return blockUser;
};

import { Request, Response, NextFunction } from "express";
import { sendToaKafkaTopic } from "../../../infrastructure/kafka/producer/producer";

export default (dependencie: any) => {
  console.log(dependencie, "dd", dependencie.userUsecases);
  const {
    userUsecases: { updateUserusecase },
  } = dependencie;

  const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.userPayload);
      const email = req.userPayload?.email;
      const data = req.body;
      console.log(email, "got email in controller");
      const user = await updateUserusecase(dependencie).interactor(email, data);
      // Send updated user data to Kafka
      const topics = ["user-updated"];
      const key = user.id;
      const message = { userId: user.id, name: user.name, email: user.email };
      await sendToaKafkaTopic(topics, key, message);
      res.status(200).json({
        success: true,
        data: user,
        message: "User updated!",
      });
    } catch (error: any) {
      next(error);
    }
  };

  return updateProfile;
};

import { NextFunction, Request, Response } from "express";

export default (dependencie: any) => {
  console.log(dependencie.userUseCase, "dependencies");
  const {
    userUseCase: { unblockUserUsecases },
  } = dependencie;
  const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params?.id;
      const user = await unblockUserUsecases(dependencie).interactor(id);
      res
        .status(200)
        .json({ success: true, data: user, message: "user blocked" });
    } catch (error: any) {
      next(error);
    }
  };
  return blockUser;
};

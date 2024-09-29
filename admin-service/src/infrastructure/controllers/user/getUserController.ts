import { NextFunction, Request, Response } from "express";

export default (dependencie: any) => {
  console.log(dependencie.userUseCase,"user")
  const {
    userUseCase: { findUserUsecase },
  } = dependencie;
  const getAlluser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("callllllllllllllllll")
      console.log(req.params)
      const id = req.params?.id;
      console.log(id,"id in the controller")
      const user = await findUserUsecase(dependencie).interactor(id);
      console.log(user,"user")
      res
        .status(200)
        .json({ success: true, data: user, message: "user listed" });
    } catch (error) {
      console.log(error)
    }
  };
  return getAlluser;
};

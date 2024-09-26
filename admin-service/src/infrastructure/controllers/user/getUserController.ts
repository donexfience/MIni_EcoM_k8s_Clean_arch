import { NextFunction, Request, Response } from "express";

export default (dependencie: any) => {
  const {
    userUseCase: { findUserCase },
  } = dependencie;
  const getAlluser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params?._id;
      const user = await findUserCase(dependencie).interactor(id);
      res
        .status(200)
        .json({ success: true, data: user, message: "user listed" });
    } catch (error) {}
  };
  return getAlluser;
};

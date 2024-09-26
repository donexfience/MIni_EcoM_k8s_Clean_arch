import { NextFunction, Request, Response } from "express";

export default (dependencie: any) => {
    
  const {
    userUseCase : { finAllUsersUsecase },
  } = dependencie;

  const getAlluser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query?.page;
      const limit = req.query?.limit;
      const user = await finAllUsersUsecase(dependencie).interactor(
        page,
        limit
      );
      res
        .status(200)
        .json({ success: true, data: user, message: "user listed" });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return getAlluser;
};

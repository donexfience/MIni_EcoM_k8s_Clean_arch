import { Request, Response, NextFunction } from "express";

export default (dependencie: any) => {
  const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.userPayload;

      if (!user) {
        throw new Error("User doesn't exist!");
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "current user data retrieved!",
      });
    } catch (error: any) {
      next(error);
    }
  };

  return currentUser;
};

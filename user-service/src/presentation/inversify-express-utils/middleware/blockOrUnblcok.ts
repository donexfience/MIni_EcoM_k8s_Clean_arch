import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../_lib/errors/customError";
import userModel from "../../../infrastructure/repositories/mongodb/model/userModel";

export const checkUserBlockStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw AppError.badRequest("user not found");
    }
    const userId = req.user._id;

    const user = await userModel.findById(userId);
    if (user?.isBlocked) {
      throw AppError.badRequest("user blocked by admin");
    }

    next();
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import userModel from "../model/schema/user";


export const isBlockedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userPayload?.isBlocked) {
      throw new Error("You are blocked from the site!");
    }
    const user = await userModel.findOne({email:req.userPayload?.email});
    if (user?.isBlocked) {
      throw new Error("You are blocked from the site!");
    }

    next();
  } catch (error: any) {
    next(error);
  }
};

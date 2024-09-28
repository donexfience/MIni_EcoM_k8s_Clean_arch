import { NextFunction, Request, Response } from "express";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.userPayload) {
    throw new Error("user not found");
  }

  if (!req.userPayload.isAdmin) {
    throw new Error("user not admin");
  }

  next();
};
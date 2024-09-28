import { NextFunction, Request, Response } from "express";

export const requrieAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.userPayload) {
    throw new Error("not authorized");
  }
  next();
};

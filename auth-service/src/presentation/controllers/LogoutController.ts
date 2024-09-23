import { NextFunction, Request, Response } from "express";

export class LogoutController {
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.cookie("token", "", { maxAge: 1 });
    } catch (error: any) {
      next(error);
    }
  }
}

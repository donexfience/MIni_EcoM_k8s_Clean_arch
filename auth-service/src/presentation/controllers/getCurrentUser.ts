import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/User/userEntitiy";
import { AppError } from "../../_lib/utils/errors/customError";
export class CurrentUserController {
  public async CurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        throw AppError.badRequest("user doesnt exist");
      }
      res.status(200).json({
        success: true,
        data: user,
        message: "user data recieved",
        user,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

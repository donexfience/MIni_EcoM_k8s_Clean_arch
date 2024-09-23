import { NextFunction, Request, Response } from "express";
import { AppError } from "../../_lib/utils/errors/customError";
import { IFindUserByEmail } from "../../domain/useCases/IFindUserByEmailCase";

export class isBlockOrUnblockUser {
  constructor(private readonly findByEmailcase: IFindUserByEmail) {}
  public checkIsBlocOrUnblock = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        throw AppError.badRequest("email not provided");
      }
      const user = await this.findByEmailcase.execute(email);
      if (user?.isBlocked) {
        throw AppError.badRequest("you are blocked from the admin");
      }
      next();
    } catch (error: any) {
      next(error);
    }
  };
}

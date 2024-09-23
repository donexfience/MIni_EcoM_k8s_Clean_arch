import { NextFunction, Request, Response } from "express";
import { ILoginUseCase } from "../../domain/useCases/ILoginUsecase";
import { ValidationType } from "../../_lib/utils/errors/validationError";
import { AppError } from "../../_lib/utils/errors/customError";
import { IFindUserByEmail } from "../../domain/useCases/IFindUserByEmailCase";

export class LoginController {
  private readonly loginUseCase: ILoginUseCase;
  private readonly finduserByemail: IFindUserByEmail;

  constructor(loginUseCase: ILoginUseCase, findUserByEmail: IFindUserByEmail) {
    this.loginUseCase = loginUseCase;
    this.finduserByemail = findUserByEmail;
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validationErrors: ValidationType[] = [];
      const { email, password } = req.body;

      if (!email || !password) {
        validationErrors.push({
          fields: ["email", "password"],
          constants: "Email and password are required",
        });
        throw AppError.badRequest("Email and password are required");
      }
      const existingUser = await this.finduserByemail.execute(email);
      if (!existingUser) {
        throw AppError.badRequest("user doesnt exist");
      }
      const result = await this.loginUseCase.execute(email, password);
      res.cookie("token", result.token, {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
        token: result.token,
      });
    } catch (error: any) {
      next(error);
    }
  };
}

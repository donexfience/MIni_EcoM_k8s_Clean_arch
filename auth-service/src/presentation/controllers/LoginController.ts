import { IFindUserByEmail } from "./../../domain/entities/User/useCases/IFindUserByEmailCase";
import { PasswordHandler } from "./../../_lib/utils/Bcyptjs/bcrypt";
import {
  TokenHandler,
  TokenPayload,
} from "../../_lib/utils/Jsonwebtoken/token";
import { NextFunction, Request, Response } from "express";
import { ValidationType } from "../../_lib/utils/errors/validationError";
import { AppError } from "../../_lib/utils/errors/customError";

export class LoginController {
  private tokenHandler = new TokenHandler();
  private PasswordHandler = new PasswordHandler();
  private readonly findUserByEmail: IFindUserByEmail;
  constructor(findUserByEmail: IFindUserByEmail) {
    this.findUserByEmail = findUserByEmail;
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vlaidationErrors: ValidationType[] = [];
      const { email, password } = req.body;
      const user = await this.findUserByEmail.execute(email);
      if (!user) {
        throw AppError.badRequest("user not found please do the signup");
      }
      const hasedPassword = await this.PasswordHandler.hashPassword(password);
      const match = await this.PasswordHandler.comparePassword(
        password,
        hasedPassword
      );
      if (!match) {
        throw AppError.badRequest(
          "the provided password doesnt match with the existing email"
        );
      }
      if (!user._id) {
        throw AppError.badRequest("id doesnt created");
      }
      const tokenPayload: TokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        isAdmin: user.isAdmin,
        isBlocked: user.isBlocked,
      };
      const token = this.tokenHandler.generateAccessToken(tokenPayload);
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

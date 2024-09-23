import { IFindUserByEmail } from "../../domain/useCases/IFindUserByEmailCase";
import { PasswordHandler } from "./../../_lib/utils/Bcyptjs/bcrypt";
import {
  TokenHandler,
  TokenPayload,
} from "../../_lib/utils/Jsonwebtoken/token";
import { AppError } from "../../_lib/utils/errors/customError";
import { ILoginUseCase } from "../../domain/useCases/ILoginUsecase";

export class LoginUseCase implements ILoginUseCase {
  private readonly findUserByEmail: IFindUserByEmail;
  private passwordHandler = new PasswordHandler();
  private tokenHandler = new TokenHandler();

  constructor(findUserByEmail: IFindUserByEmail) {
    this.findUserByEmail = findUserByEmail;
  }

  public async execute(email: string, password: string) {
    const user = await this.findUserByEmail.execute(email);
    if (!user) {
      throw AppError.badRequest("User not found, please sign up.");
    }

    const isMatch = await this.passwordHandler.comparePassword(
      password,
      user.password
    );
    if (!isMatch) {
      throw AppError.badRequest("Invalid password.");
    }
    if (!user._id) {
      throw AppError.badRequest("user doesnt have user id");
    }
    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
    };
    const token = this.tokenHandler.generateAccessToken(tokenPayload);

    return { user, token };
  }
}

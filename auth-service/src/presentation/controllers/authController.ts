import { NextFunction, Request, Response } from "express";
import { LoginController } from "./LoginController";
import { SignupController } from "./signupController";
import { LogoutController } from "./LogoutController";
import { CurrentUserController } from "./getCurrentUser";

export class AuthController {
  private loginController: LoginController;
  private signupController: SignupController;
  private logoutController: LogoutController;
  private CurrentUserController: CurrentUserController;
  constructor(
    loginController: LoginController,
    signupController: SignupController,
    logoutController: LogoutController,
    currentUserController: CurrentUserController
  ) {
    this.loginController = loginController;
    this.signupController = signupController;
    this.logoutController = logoutController;
    this.CurrentUserController = currentUserController;
  }
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return this.loginController.login(req, res, next);
  };
  public signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return this.signupController.createUser(req, res, next);
  };
  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return this.logoutController.logout(req, res, next);
  };
  public getActiveUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    return this.CurrentUserController.CurrentUser(req, res, next);
  };
}

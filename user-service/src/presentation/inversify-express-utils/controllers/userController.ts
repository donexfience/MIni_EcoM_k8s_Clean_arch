import { inject } from "inversify";
import { Request, Response } from "express";
import {
  controller,
  httpPatch,
  requestBody,
  request,
  response,
  httpGet,
} from "inversify-express-utils";
import { IUpdateUserUsecase } from "../../../domain/useCase/user/updateUserusecase";
import { User } from "../../../domain/entities/user/userEntity";
import { ValidationError } from "../../../_lib/errors/validationError";
import { AppError } from "../../../_lib/errors/customError";
import { checkUserBlockStatus } from "../middleware/blockOrUnblcok";
import { MongooseError } from "mongoose";
import { checkBlockedUser, requrieAuth, setCurrentUser } from "donexfdz";


@controller("/api/user")
export class UserController {
  private readonly updateUserUseCase: IUpdateUserUsecase;

  constructor(
    @inject("IupdateUserUseCase")
    updateUserUseCase: IUpdateUserUsecase
  ) {
    console.log("user controller intialized");
    this.updateUserUseCase = updateUserUseCase;
  }

  @httpGet("/user", checkUserBlockStatus,setCurrentUser,checkBlockedUser,requrieAuth)
  public getUser(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        throw AppError.badRequest("user not found");
      }
      res.status(200).json({
        success: true,
        data: user,
        message: "success geting api/users",
      });
    } catch (error: any) {
      console.log(error, "user not found");
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({
          message: error.message,
          validationErrors: error.validationErrors,
        });
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        const internalError = AppError.internalServer("Internal Server Error");
        res
          .status(internalError.statusCode)
          .json({ message: internalError.message });
      }
    }
  }

  @httpPatch("/update", checkUserBlockStatus, setCurrentUser,checkUserBlockStatus,requrieAuth)
  public async updateUser(
    @request() req: Request,
    @requestBody() updatedUserData: Partial<User>,
    @response() res: Response
  ): Promise<void> {
    try {
      const id = req.user?.userId

      // Validation
      if (!id) {
        throw AppError.badRequest("User ID is required.");
      }
      if (!updatedUserData || Object.keys(updatedUserData).length === 0) {
        throw new ValidationError([
          {
            fields: ["updatedUserData"],
            constants: "Updated user data is required.",
          },
        ]);
      }

      const updatedUser = await this.updateUserUseCase.execute(
        id.toString(),
        updatedUserData
      );
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);

      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({
          message: error.message,
          validationErrors: error.validationErrors,
        });
      } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else if (error instanceof MongooseError) {
        res.status(400).json({ message: error.message });
      } else {
        const internalError = AppError.internalServer("Internal Server Error");
        res
          .status(internalError.statusCode)
          .json({ message: internalError.message });
      }
    }
  }
}

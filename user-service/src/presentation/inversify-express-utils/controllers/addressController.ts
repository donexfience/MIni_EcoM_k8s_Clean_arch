import { inject } from "inversify";
import { Request, Response } from "express";
import {
  controller,
  httpPatch,
  requestBody,
  request,
  response,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { ValidationError } from "../../../_lib/errors/validationError";
import { AppError } from "../../../_lib/errors/customError";
import { ICreateAdressuseCase } from "../../../domain/useCase/adress/createAdress";
import { Address } from "../../../domain/entities/address/addressEntity";
import { Types } from "mongoose";
import { IDeleteAdressUsecase } from "../../../domain/useCase/adress/DeleteAdress";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

@controller("/api/address")
export class AddressController {
  private readonly createAdressCase: ICreateAdressuseCase;
  private readonly deleteAdressCase: IDeleteAdressUsecase;

  constructor(
    @inject("ICreateAdressuseCase")
    createAdress: ICreateAdressuseCase,
    @inject("IDeleteAdressUsecase")
    deleteAdress: IDeleteAdressUsecase
  ) {
    console.log("Address controller intialized");
    this.createAdressCase = createAdress;
    this.deleteAdressCase = deleteAdress;
  }
  @httpGet("/")
  public getUser(req: Request, res: Response) {
    res.status(200).json({ message: "success geting api/address" });
  }
  @httpPost("/create")
  public async createUser(
    @request() req: Request,
    @requestBody() userdata: Partial<Address>,
    @response() res: Response
  ): Promise<void> {
    try {
      const { fullname, address, city, phone, pincode, userId } = req.body;
      const newAdress = new Address(
        fullname,
        phone,
        address,
        city,
        pincode,
        new Types.ObjectId(),
        userId
      );
      const addressdata = await this.createAdressCase.execute(newAdress);
      res
        .status(201)
        .json({ success: true, data: addressdata, message: "Address created" });
    } catch (error) {
      console.error("Error updating user:", error);

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
  public async deleteAdress(
    @request() req: Request,
    @requestBody() body: Partial<Address>,
    @response() res: Response
  ): Promise<void> {
    try {
      const { userId } = req.body;
      await this.deleteAdressCase.execute(userId);
    } catch (error) {
      console.error("Error updating user:", error);

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
}

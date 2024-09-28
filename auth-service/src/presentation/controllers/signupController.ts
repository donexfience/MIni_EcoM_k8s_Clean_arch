import { ICreateUserCase } from "../../domain/useCases/ICreateUseCase";
import { PasswordHandler } from "../../_lib/utils/Bcyptjs/bcrypt";
import { IFindUserByEmail } from "../../domain/useCases/IFindUserByEmailCase";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../../domain/entities/User/userEntitiy";
import { AppError } from "../../_lib/utils/errors/customError";
import {
  ValidationError,
  ValidationType,
} from "../../_lib/utils/errors/validationError";
import {
  TokenHandler,
  TokenPayload,
} from "../../_lib/utils/Jsonwebtoken/token";
import {
  isStrongPassword,
  isValidEmail,
} from "../../_lib/utils/validations/validation";
import { KafkaProducerService } from "../../infrastructure/Kafka/producer/common/Producer";
import { Topics } from "donexfdz";

export class SignupController {
  private tokenHandler = new TokenHandler();
  private psaswordHandler = new PasswordHandler();
  private readonly createUserUseCase: ICreateUserCase;
  private readonly findUserByEmail: IFindUserByEmail;
  private kafkaProducerService: KafkaProducerService;
  constructor(
    createUserUseCase: ICreateUserCase,
    findUserByEmail: IFindUserByEmail,
    kafkaProducer: KafkaProducerService
  ) {
    this.createUserUseCase = createUserUseCase;
    this.findUserByEmail = findUserByEmail;
    this.kafkaProducerService = kafkaProducer;
  }
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ValidationErrors: ValidationType[] = [];

      const { email, password, role, gender, name } = req.body;
      console.log(typeof name);
      console.log(req.body, "ddd");
      if (!isValidEmail(email)) {
        ValidationErrors.push({
          fields: ["email"],
          constants: "invalid email ",
        });
      }
      if (isStrongPassword(password)) {
        ValidationErrors.push({
          fields: ["password"],
          constants:
            "Password must be atleast 8 characteres long include symbols",
        });
      }

      //produce user created event using kafka

      const existingUser = await this.findUserByEmail.execute(email);
      if (existingUser) {
        throw AppError.badRequest("user already exist");
      }
      const hashedPassword = await this.psaswordHandler.hashPassword(password);
      const newUser = new User(name, email, hashedPassword, false, false);

      const user = await this.createUserUseCase.execute(newUser);
      if (!user) {
        throw AppError.badRequest("user not created");
      }
      if (!user._id) {
        throw AppError.badRequest("user id not created");
      }
      console.log(user, "usser crated");
      const userCreatedEvent = {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isBlocked: user.isBlocked,
        password: user.password,
      };
      console.log(userCreatedEvent, "44");
      await this.kafkaProducerService.produce("user-created", userCreatedEvent);
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
      res.status(201).json({
        success: true,
        message: "user created successfully",
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

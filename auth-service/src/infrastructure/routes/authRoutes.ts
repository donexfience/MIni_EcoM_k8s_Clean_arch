import { SignupUseCase } from "./../../application/useCase/create-user-usecase";
import { NextFunction, Request, Response, Router } from "express";
import { FindUserByEmail } from "../../application/useCase/find-user-by-email-usecase";
import { SignupController } from "../../presentation/controllers/signupController";
import { LoginController } from "../../presentation/controllers/LoginController";
import { LoginUseCase } from "../../application/useCase/Login-usecase";
import { MongoAuthRepository } from "../repositories/mongodb/Mongo-AuthRepositoy";
import { KafkaProducerService } from "../Kafka/producer/common/Producer";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new MongoAuthRepository();

    // Initialize Use Cases
    const findbyemailUseCase = new FindUserByEmail(repository);
    const loginUseCase = new LoginUseCase(findbyemailUseCase);
    const signupUseCase = new SignupUseCase(repository);
    const kafkaProducerService = new KafkaProducerService();

    // Separate Controllers
    const signupController = new SignupController(
      signupUseCase,
      findbyemailUseCase,
      kafkaProducerService
    );
    const loginController = new LoginController(
      loginUseCase,
      findbyemailUseCase
    );

    // Test route to check if `/api/auth` is working
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send({ message: "Auth route is working!" });
    });

    // Define the routes
    router.post("/login", (req: Request, res: Response, next: NextFunction) =>
      loginController.login(req, res, next)
    );
    router.post("/signup", (req: Request, res: Response, next: NextFunction) =>
      signupController.createUser(req, res, next)
    );

    return router;
  }
}

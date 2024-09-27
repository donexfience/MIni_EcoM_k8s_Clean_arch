import express, {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import {
  HttpCode,
  ONE_HUNDRED,
  ONE_THOUSAND,
  SIXTY,
} from "./_lib/utils/errors/constants-htt-status";
import rateLimit from "express-rate-limit";
import { AppError } from "./_lib/utils/errors/customError";
import { ErrorMiddleware } from "./presentation/middleware/error-middlwware";
import { Database } from "./infrastructure/repositories/mongodb/connection/connetion";
import { ConsumerManager } from "./infrastructure/Kafka/consumer/consumer_manager/consumer";
import { UserBlockUseCase } from "./application/useCase/user-block-usecase";
import { AuthRepository } from "./application/interface/repositories/IAuth";
import { MongoAuthRepository } from "./infrastructure/repositories/mongodb/Mongo-AuthRepositoy";
import { UserUnBlockUseCase } from "./application/useCase/user-unblock-user";

interface ServerOptions {
  port: number;
  routes: Router;
  apiPrefix: string;
}

export class Server {
  private readonly brokers = process.env.BROKERS_ID?.split(",") || [
    "localhost:9092",
  ];
  private readonly authRepostory = new MongoAuthRepository();
  private readonly userBlockUseCase = new UserBlockUseCase(this.authRepostory);
  private readonly userUnBlokcUsecase = new UserUnBlockUseCase(
    this.authRepostory
  );

  private readonly consumerManager = new ConsumerManager(
    this.brokers,
    this.userUnBlokcUsecase,
    this.userBlockUseCase
  );
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;

  constructor(configOptions: ServerOptions) {
    const { port, apiPrefix, routes } = configOptions;
    this.port = port;
    this.routes = routes;
    this.apiPrefix = apiPrefix;
  }

  public async start(): Promise<void> {
    console.log(`API Prefix: ${this.apiPrefix}`);
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Rate Limiting
    this.app.use(
      rateLimit({
        max: ONE_HUNDRED,
        windowMs: SIXTY * SIXTY * ONE_THOUSAND,
        message: "Too many requests from this IP, please try again in one hour",
      })
    );
    //consumers
    this.consumerManager.startConsumers().catch((error: any) => {
      console.error("Error initializing consumer manager:", error);
    });
    // CORS Configuration
    this.app.use((req, res, next) => {
      const allowedOrigins = ["http://localhost:5173"];
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin!)) {
        res.setHeader("Access-Control-Allow-Origin", origin!);
      }
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    // Routes
    this.app.use(this.apiPrefix, this.routes);
    // Test Endpoint
    this.app.get("/", (req: Request, res: Response) => {
      return res.status(HttpCode.OK).send({
        message: `Welcome to Initial API! Endpoints available at http://localhost:${this.port}/`,
      });
    });

    // Handle Not Found Routes
    this.app.use((req: Request, _: Response, next: NextFunction) => {
      next(AppError.notFound(`Can't find ${req.originalUrl} on this server!`));
    });

    // Error Handling Middleware
    this.app.use(ErrorMiddleware.handleError);

    // Start Server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}...`);
    });
    await Database.connect();
  }
}

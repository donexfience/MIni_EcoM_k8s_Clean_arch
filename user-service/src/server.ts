import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import express, { NextFunction, Request, Response } from "express";
import "./presentation/inversify-express-utils/userController"; // Ensure this is correctly set up
import { Database } from "./infrastructure/repositories/mongodb/connection/connection";
import { container } from "./config/inversify-config-container";
import { ErrorMiddleware } from "./presentation/inversify-express-utils/Errors-middleware/error-middleware";
import { AppError } from "./_lib/errors/customError";

const server = new InversifyExpressServer(container);

server.setConfig(async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Log each request
  app.use((req: Request, _: Response, next: NextFunction) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  });

  // Handle not found routes
  app.use((req: Request, _: Response, next: NextFunction) => {
    next(AppError.notFound(`Can't find ${req.originalUrl} on this server!`));
  });

  // Test route
  app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
  });

  // Error Handling Middleware
  app.use(ErrorMiddleware.handleError);
});

const app = server.build();
const port = process.env.PORT || 3001;

app.listen(port, async () => {
  await Database.connect(); // Ensure this does not hang the server
  console.log(`Server is running on port ${port}`);
});

import "reflect-metadata";;
import { InversifyExpressServer } from "inversify-express-utils";
import express, { NextFunction, Request, Response } from "express";
import "./presentation/inversify-express-utils/controllers/userController";
import './presentation/inversify-express-utils/controllers/addressController'
import { Database } from "./infrastructure/repositories/mongodb/connection/connection";
import { container } from "./config/inversify-config-container";
import { checkUserBlockStatus } from "./presentation/inversify-express-utils/middleware/blockOrUnblcok";


const server = new InversifyExpressServer(container);
server.setConfig(async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/api/user/update",
    (req: Request, res: Response, next: NextFunction) => {
      console.log("Incoming request to /api/user/update:", req.body);
      next();
    }
  );

  app.get("/", (req: Request, res: Response) => {
    console.log("hello ");
    res.send("Hello World");
  });
});

const app = server.build();
const port = process.env.PORT || 3001;

app.listen(port, async () => {
  await Database.connect();
  console.log(`Server is running on port ${port}`);
});

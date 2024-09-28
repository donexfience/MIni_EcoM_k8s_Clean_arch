import cookieParser from "cookie-parser";
import express, { Request, Response, Application, NextFunction } from "express";
import userRoutes from "./presentation/routes/user/userRoutes";
import addressRoute from "./presentation/routes/address/addressRoutes";
import { errorHandler } from "donexfdz";
import { ErrorMiddleware } from "./presentation/Errors-middleware/error-middleware";
import {
  startConsumer,
  stopConsumer,
} from "./infrastructure/kafka/consumer/consumer";
import { userUpdateConsumer } from "./infrastructure/kafka/consumer/consumers/userUpdateConsumer";
import { userCreateConsumer } from "./infrastructure/kafka/consumer/consumers/userCreatedConsumer";
import { userblockConsumer } from "./infrastructure/kafka/consumer/consumers/userBlockConsumer";
import { userUnblockConsumer } from "./infrastructure/kafka/consumer/consumers/userUnblockConsumer";
import { Database } from "./infrastructure/repositories/mongodb/connection/connection";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "User service working",
  });
});
// app.use("/api/user", (req: Request, res: Response) => {
//   console.log(req.user, "user is here");
// });
app.use(userRoutes);
app.use(addressRoute);

// app.all("*", async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error("error");
// });

app.use(errorHandler);
app.use(ErrorMiddleware.handleError);
const port: number = Number(process.env.PORT) || 3001;

const topics = [
  "user-updated",
  "user-created",
  "user-blocked",
  "user-unblocked",
];

startConsumer(topics, {
  "user-updated": userUpdateConsumer,
  "user-created": userCreateConsumer,
  "user-blocked": userblockConsumer,
  "user-unblocked": userUnblockConsumer,
})
  .then(() => console.log("Kafka consumer started successfully"))
  .catch((error) => console.error("Error starting Kafka consumer:", error));

process.on("SIGINT", async () => {
  await stopConsumer();
  process.exit(0);
});
const connect = async () => {
  await Database.connect();
};
connect();
app.listen(port, () => {
  console.log(`User Service listening at ${port}`);
});

export default app;

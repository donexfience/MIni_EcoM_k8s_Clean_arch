import express, { Request, Response, Application, NextFunction } from "express";

import { errorHandler } from "donexfdz";

import cookieParser from "cookie-parser";
import path from "path";
import userRouter from "./presentation/routes/userRoutes";
import productRouter from "./presentation/routes/productRoutes";
import {
  startConsumer,
  stopConsumer,
} from "./infrastructure/kafka/consumer/consumer";
import { userUpdateConsumer } from "./infrastructure/kafka/consumer/consumers/userUpdateConsumer";
import { userCreateConsumer } from "./infrastructure/kafka/consumer/consumers/userCreatedConsumer";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "working",
  });
});
//image uploads
app.use(
  "/api/images",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

app.use(userRouter);
app.use(productRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next();
});

// app.use(errorHandler);
const topics = [
  "user-updated",
  "user-created",
];

startConsumer(topics, {
  "user-updated": userUpdateConsumer,
  "user-created": userCreateConsumer,
})
  .then(() => console.log("Kafka consumer started successfully"))
  .catch((error) => console.error("Error starting Kafka consumer:", error));

process.on("SIGINT", async () => {
  await stopConsumer();
  process.exit(0);
});

const port: number = Number(process.env.PORT) || 3005;
app.listen(port, () => {
  console.log(`Admin Service listening at ${port}`);
});

export default app;

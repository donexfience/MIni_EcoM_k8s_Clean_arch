import App from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3002;
const server = new App(Number(PORT));
server.listen();
const shutdown = async () => {
  console.log("Shutting down gracefully...");
  await server.stopConsumers();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

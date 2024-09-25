import App from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3003;
const server = new App(Number(PORT));
server.listen();

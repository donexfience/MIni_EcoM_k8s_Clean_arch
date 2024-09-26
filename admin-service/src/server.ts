import dotenv from "dotenv";
import { Database } from "./infrastructure/repostories/mongodb/connection";
import Application from "./app";
dotenv.config();
(async () => {
  try {
    Application;
    await Database.connect();
  } catch (error: any) {
    console.log(`stoped ${error.message}`);
  }
})();

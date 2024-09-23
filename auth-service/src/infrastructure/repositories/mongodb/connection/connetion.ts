import mongoose from "mongoose";
import { dbConfig } from "../../../../config/database/database";


export class Database {
  public static async connect(): Promise<void> {
    const { host, port, database } = dbConfig;
    const connectionString = `mongodb://${host}:${port}/${database}`;

    try {
      await mongoose.connect(connectionString);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }
}

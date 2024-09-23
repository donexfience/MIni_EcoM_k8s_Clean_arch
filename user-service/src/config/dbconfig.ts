import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  host: process.env.MONGO_URI || "localhost",
  port: Number(process.env.DB_PORT) || 27017,
  database: process.env.DB_NAME || "Userdatabase",
  uri:`mongodb+srv://donex6fience:${process.env.MONGO_CLUSTER_PASS}@auth.bbdo8.mongodb.net/?retryWrites=true&w=majority&appName=AUTH`
};

import mongoose from "mongoose";
import { envs } from "../config/envs";

export class MongoConnection {
  static async connect() {
    try {
      await mongoose.connect(envs.MONGO_DB_URL, {
        dbName: envs.MONGO_DB_NAME,
      });
      console.log("MongoDB connected successfully");
    } catch (e) {
      throw new Error("Error connecting to MongoDB");
    }
  }
}

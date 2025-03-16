import mongoose from "mongoose";

export class MongoDB {
  static async config(url: string, dbName: string) {
    try {
      await mongoose.connect(url, { dbName: dbName });
      console.log("Conexion establecida");
      return true;
    } catch (error) {
      console.log("Conexion no establecida");
      throw error;
    }
  }
  static async disconnect() {
    await mongoose.disconnect();
  }
}

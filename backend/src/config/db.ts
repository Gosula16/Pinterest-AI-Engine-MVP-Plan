import mongoose from "mongoose";
import { env } from "./env.js";

let connected = false;

export async function connectDb() {
  if (connected) {
    return mongoose.connection;
  }

  await mongoose.connect(env.MONGO_URI);
  connected = true;
  return mongoose.connection;
}


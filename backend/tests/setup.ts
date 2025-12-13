import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../src/config/db";
import mongoose from "mongoose";
beforeAll(async () => {//hook funct to test jest runs before any test starts
  await connectDB();
});

afterAll(async () => {//runs after any test finishes
  await mongoose.connection.close();
});

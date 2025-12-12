import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../src/config/db";
import mongoose from "mongoose";
beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

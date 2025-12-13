import request from "supertest";
import app from "../../src/app";
import { Sweet } from "../../src/models/sweet.model";
import mongoose from "mongoose";

describe("Sweet Routes - Create Sweet", () => {

  beforeAll(async () => {
    await Sweet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new sweet", async () => {
    const sweetData = {
      name: "Gulab Jamun",
      category: "Indian",
      price: 50,
      quantity: 20,
    };

    const res = await request(app)
      .post("/api/sweets")
      .send(sweetData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Gulab Jamun");
    expect(res.body.category).toBe("Indian");
    expect(res.body.price).toBe(50);
    expect(res.body.quantity).toBe(20);
  });
});

import request from "supertest";
import app from "../../src/app";
import { Sweet } from "../../src/models/sweet.model";

describe("Sweet Routes", () => {

  beforeEach(async () => {
    await Sweet.deleteMany({});
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
  });

  it("should return all sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

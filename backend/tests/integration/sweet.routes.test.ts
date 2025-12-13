import request from "supertest";
import app from "../../src/app";
import { Sweet } from "../../src/models/sweet.model";

describe("Sweet Routes", () => {

  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  it("should create a new sweet", async () => { //create
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

  it("should return all sweets", async () => { //return 
    const res = await request(app).get("/api/sweets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should search sweets by name", async () => {//searching for sweets
  // Arrange
  await request(app).post("/api/sweets").send({
    name: "Rasgulla",
    category: "Indian",
    price: 40,
    quantity: 15,
  });

  await request(app).post("/api/sweets").send({
    name: "Ladoo",
    category: "Indian",
    price: 30,
    quantity: 10,
  });
  // Act
  const res = await request(app).get("/api/sweets/search?name=Rasgulla");
  // Assert
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Rasgulla");
});
describe("PUT /sweets/:id", () => {
  it("should update a sweet by id", async () => {
    const created = await request(app)
      .post("/api/sweets")
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 5,
      });
    const sweetId = created.body._id;
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .send({
        price: 15,
        quantity: 10,
      });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(15);
    expect(res.body.quantity).toBe(10);
  });
});
describe("DELETE /api/sweets/:id", () => {
  it("should delete a sweet by id", async () => {
    // create sweet
    const created = await request(app)
      .post("/api/sweets")
      .send({
        name: "Kaju Katli",
        category: "Indian",
        price: 100,
        quantity: 10,
      });
    const sweetId = created.body._id;
    // delete sweet
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet Deleted");
  });
});
});
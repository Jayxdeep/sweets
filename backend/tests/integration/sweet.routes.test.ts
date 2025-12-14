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
it("should return 404 when deleting non-existing sweet", async () => {
  const fakeId = "507f1f77bcf86cd799439011";
  const res = await request(app)
    .delete(`/api/sweets/${fakeId}`);
  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Sweet not found");
});
describe("POST /api/sweets/:id/purchase", () => {
  it("should decrease sweet quantity by 1 when purchased", async () => {
    // create sweet with quantity 5
    const created = await request(app)
      .post("/api/sweets")
      .send({
        name: "Mysore Pak",
        category: "Indian",
        price: 80,
        quantity: 5,
      });
    const sweetId = created.body._id;
    // purchase sweet
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
  });
});
it("should return error when purchasing a sweet that is out of stock", async () => {
  // creating sweet with quantity 0
  const created = await request(app)
    .post("/api/sweets")
    .send({
      name: "Soan Papdi",
      category: "Indian",
      price: 60,
      quantity: 0,
    });
  const sweetId = created.body._id.toString();
  // attempt purchase
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/purchase`);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Sweet is out of stock");
});
describe("POST /api/sweets/:id/restock", () => {
  it("should increase sweet quantity when restocked", async () => {
    // create sweet with quantity 2
    const created = await request(app)
      .post("/api/sweets")
      .send({
        name: "Peda",
        category: "Indian",
        price: 40,
        quantity: 2,
      });
    const sweetId = created.body._id.toString();
    // restock sweet by 5
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .send({ amount: 5 });
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(7);
  });
});
//this is a negative test to check if the stocks hit negative or not
it("should return error for invalid restock amount", async () => {
  const created = await request(app)
    .post("/api/sweets")
    .send({
      name: "Kalakand",
      category: "Indian",
      price: 70,
      quantity: 5,
    });
  const sweetId = created.body._id.toString();
  const res = await request(app)
    .post(`/api/sweets/${sweetId}/restock`)
    .send({ amount: -3 });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Invalid restock amount");
});
});
import request from "supertest"
import app from "../../src/app"
import {User} from "../../src/models/user.model"
describe("Auth routes",()=>{
  beforeEach(async()=>{
    await User.deleteMany({});
  });
  it("should register a new user",async()=>{
    const res=await request(app)
    .post("/api/auth/register")
    .send({
      email:"test@rpute.com",
      password:"123456"
    })
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("userID");
  });
  it("should login a user and return token", async () => {
    // First register a user
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "login@route.com",
        password: "mypass123"
      });
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@route.com",
        password: "mypass123"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
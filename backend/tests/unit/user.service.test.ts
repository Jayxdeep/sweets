import { registerUser } from "../../../src/services/userService";
describe("User Service - Register User", () => {
  it("should hash password before saving", async () => {
    const mockUserInput = { email: "test@example.com", password: "123456" };
    const result = await registerUser(mockUserInput);
    expect(result).toHaveProperty("_id");
    expect(result.password).not.toBe("123456");
  });
});//

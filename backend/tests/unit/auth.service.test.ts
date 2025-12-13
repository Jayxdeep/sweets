import { loginUser } from "../../src/services/authService";
import { registerUser } from "../../src/services/userService";

describe("Auth Service - Login User", () => {
  it("should return a JWT when login succeeds", async () => {
    const mockUser = {
      email: "login@example.com",
      password: "mypassword123"
    };
    await registerUser(mockUser);
    const result = await loginUser({
      email: mockUser.email,
      password: mockUser.password
    });

    // Assert
    expect(result).toHaveProperty("token");
    expect(typeof result.token).toBe("string");
  });

});

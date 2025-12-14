import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { LoginUserDTO } from "../types/auth";
import { signToken } from "../utils/jwt";
export const loginUser = async (data: LoginUserDTO) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  // Find user
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    throw new Error("Invalid username or password");
  }
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }
  const token = signToken({
    userId: user._id.toString(),
    email: user.email!,
    role: user.role as "USER" | "ADMIN", 
  });
  return {
    token,
    user: {
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
};
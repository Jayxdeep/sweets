import { Request, Response } from "express";
import { registerUser } from "../services/userService";
import { loginUser } from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json({
      userID: user._id.toString(),
      email: user.email,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    return res.status(200).json({
      token: result.token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
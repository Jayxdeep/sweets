import jwt from "jsonwebtoken";
export interface JwtPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}
export const signToken = (payload: JwtPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

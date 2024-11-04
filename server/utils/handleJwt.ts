import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { User } from "../interfaces/userInterface";

export const tokenSign = async (user: Partial<User>): Promise<string> => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  const sign = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

export const verifyToken = async (
  tokenJwt: string
): Promise<string | object | null> => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

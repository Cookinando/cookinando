import User from "../models/userModel";
import { handleHttpError } from "../utils/handleError";
import { compare, encrypt } from "../utils/handlePassword";
import { tokenSign } from "../utils/handleJwt";
import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/userInterface";

export const registerController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    let { role } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Las contraseñas no coinciden" });
      return;
    }

    if (role === undefined) {
      role = "user";
    } else {
      const authUser = req.user;
      if (role === "admin" && authUser?.role !== "admin") {
        res.status(403).json({
          error: "Access denied. Only admins can create other admins.",
        });
        return;
      }
    }

    const passwordHashed = await encrypt(password);

    const lastUser = await User.findOne({ order: [["id", "DESC"]] });
    const newId = lastUser ? lastUser.id + 1 : 1;

    const newUser = {
      id: newId,
      username,
      email,
      password: passwordHashed,
      role,
    };

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    const existingUserByName = await User.findOne({ where: { username } });
    if (existingUserByName) {
      res.status(409).json({ message: "Name already in use" });
      return;
    }

    await User.create(newUser);

    const token = await tokenSign({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    });

    res.status(201).json({ message: "✅ User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error creating user" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    if (!userEmail || !loginPassword) {
      handleHttpError(res, "❌ EMAIL_OR_PASSWORD_MISSING", 400);
      return;
    }

    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "❌ USER_NOT_EXISTS", 404);
      return;
    }

    const passwordHashed = user.password;
    const checkPassword = await compare(loginPassword, passwordHashed);
    if (!checkPassword) {
      handleHttpError(res, "❌ PASSWORD_INVALID", 401);
      return;
    }

    const sessionData = {
      token: await tokenSign(user),
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        role: user.role,
      },
    };

    res.status(200).send({ sessionData });
  } catch (error: any) {
    console.error("❌ Error in login process:", error.message || error);

    if (error.name === "SequelizeConnectionError") {
      handleHttpError(res, "❌ DATABASE_CONNECTION_ERROR", 500);
    } else if (error.name === "SequelizeValidationError") {
      handleHttpError(res, "❌ DATABASE_VALIDATION_ERROR", 400);
    } else {
      handleHttpError(res, "❌ ERROR_LOGIN_USER", 500);
    }
  }
};

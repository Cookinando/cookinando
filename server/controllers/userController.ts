import { Request, Response } from "express";
import User from "../models/userModel";
import { AuthRequest } from "../interfaces/userInterface";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving users:", error.message);
      res.status(500).json({
        error: "An error occurred while retrieving the users. Please try again later.",
      });
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving user:", error.message);
      res.status(500).json({
        error: "An error occurred while retrieving the user. Please try again later.",
      });
    }
  }
};

export const createUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    let { isAdmin } = req.body;

    // Si isAdmin no se proporciona en el cuerpo de la solicitud, por defecto es false
    if (isAdmin === undefined) {
      isAdmin = false;
    } else {
      // Si isAdmin es true, asegura que el usuario autenticado también sea admin
      const authUser = req.user;
      if (isAdmin && !authUser?.isAdmin) {
        res.status(403).json({ error: "Access denied. Only admins can create other admins." });
        return;
      }
    }

    const newUser = await User.create({
      username,
      password,
      email,
      isAdmin,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        error: "An error occurred while creating the user. Please try again later.",
        details: error.message,
      });
    }
  }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, password, email, isAdmin } = req.body;
    const [updated] = await User.update(
      { username, password, email, isAdmin },
      { where: { id } }
    );
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
      res.status(500).json({
        error: "An error occurred while updating the user. Please try again later.",
        details: error.message,
      });
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "User successfully deleted." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({
        error: "An error occurred while deleting the user. Please try again later.",
        details: error.message,
      });
    }
  }
};

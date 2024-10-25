import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/userInterface";

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }
  
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET as string) as AuthRequest['user'];
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
  
  export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user?.isAdmin) {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }
    next();
  };
  
  export const canCreateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.body.isAdmin && !req.user?.isAdmin) {
      res.status(403).json({ message: "Access denied. Only admins can create other admins." });
      return;
    }
    next();
};

import { Router } from "express";
import { getUsers, getUser, editUser, deleteUser, createUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.put("/:id", authenticateToken, editUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

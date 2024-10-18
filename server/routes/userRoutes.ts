import { Router } from "express";
import { getUsers, getUser, editUser, deleteUser, createUser } from "../controllers/userController";
import { authenticateToken, isAdmin, canCreateAdmin } from "../middlewares/authMiddleware";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", createUser);
userRouter.post("/admin", authenticateToken, isAdmin, canCreateAdmin, createUser);

userRouter.put("/:id", editUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

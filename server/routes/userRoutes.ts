import { Router } from "express";
import { getUsers, getUser, createUser, editUser, deleteUser } from "../controllers/userController";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", createUser);

userRouter.put("/:id", editUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

import { Router } from "express";
import { getUsers, getUser, editUser, deleteUser, createUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateSignUp, validateUpdateProfile } from "../middlewares/validators/userValidator";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", validateSignUp, createUser);

userRouter.put("/:id", validateUpdateProfile, authenticateToken, editUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

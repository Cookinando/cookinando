import { Router } from "express";
import { getUsers, getUser, editUser, deleteUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateUpdateProfile } from "../middlewares/validators/userValidator";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.put("/:id", authenticateToken, validateUpdateProfile, editUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

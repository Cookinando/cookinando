import { Router } from "express";
import { loginUser } from "../controllers/authController";
import { validateLogIn } from "../middlewares/validators/userValidator";
import { validate } from "../middlewares/validators/handleValidator";


const authRouter = Router();

authRouter.post("/login", validateLogIn, validate, loginUser);

export default authRouter;

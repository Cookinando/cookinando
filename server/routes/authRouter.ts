import { Router } from "express";
import { loginUser } from "../controllers/authController";
import { validateLogIn, validateSignUp, validateUpdateProfile } from "../middlewares/validators/userValidator";
import { validate } from "../middlewares/validators/handleValidator";


const authRouter = Router();

authRouter.post("/login", validateLogIn, validateSignUp, validateUpdateProfile, validate, loginUser);

export default authRouter;

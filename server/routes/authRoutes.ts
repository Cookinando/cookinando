import express, { Router } from "express";
import { loginController, registerController  } from "../controllers/authController";
import { validateSignUp, validateLogIn } from "../middlewares/validators/userValidator";

const authRouter: Router = express.Router();

authRouter.post("/signup", validateSignUp, registerController);
authRouter.post("/login", validateLogIn, loginController);

export default authRouter;

import express, { Router } from "express";
import { loginController, registerController  } from "../controllers/authController";

const authRouter: Router = express.Router();

authRouter.post("/signup", registerController);
authRouter.post("/login", loginController);

export default authRouter;

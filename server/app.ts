import express, { Application } from "express";
import db from "./database/db";
import userRouter from "./routes/userRoutes";
import userModel from "./models/userModel";
import cors from 'cors';
import authRouter from "./routes/authRouter";

export const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.use("/api/users", userRouter, authRouter);
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("👍Connection has been established successfully.");

    await userModel.sync({ alter: false });
    console.log("✅ Database synced successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to Database", error);
    throw error;
  }
};

export const server = app.listen(PORT, () => {
  console.log(`🏃‍♂️ Server running on http://localhost:${PORT}`);
});

startServer();
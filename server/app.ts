import express, { Application } from "express";
import db from "./database/db";
import userRouter from "./routes/userRoutes";
import userModel from "./models/userModel";
import cors from 'cors';

export const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("👍Connection has been established successfully.");

    await userModel.sync({ alter: true });
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
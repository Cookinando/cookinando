import express, { Application } from "express";
import db from "./database/db";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import userModel from "./models/userModel";
import postModel from "./models/postModel";
import cors from 'cors';

export const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("👍Connection has been established successfully.");

    await userModel.sync({ alter: true });
    await postModel.sync({ alter: true });
    console.log("The table for the meme model was just (re)created!💕");
  } catch (error) {
    console.error("❌ Unable to connect to Database", error);
    throw error;
  }
};

export const server = app.listen(PORT, () => {
  console.log(`🏃‍♂️ Server running on http://localhost:${PORT}`);
});

startServer();
import express from "express";
import db from "./database/db";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import cors from 'cors';
import authRouter from "./routes/authRouter";

export const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter, authRouter);
app.use("/api/posts", postRouter);

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("👍Connection has been established successfully.");

    await db.sync({ alter: true });
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
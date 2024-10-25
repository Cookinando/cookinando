import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken, isAdmin } from "../middlewares/authMiddleware";

const postRouter: Router = express.Router();

postRouter.post('/', authenticateToken, isAdmin, createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', authenticateToken, getPostById);
postRouter.put('/:id', authenticateToken, isAdmin, updatePost);
postRouter.delete('/:id', authenticateToken, isAdmin, deletePost);

export default postRouter;
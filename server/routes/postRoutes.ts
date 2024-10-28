import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateCreatePost, validateUpdatePost, } from "../middlewares/validators/postValidator";

const postRouter: Router = express.Router();

postRouter.post('/', authenticateToken, validateCreatePost, createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', authenticateToken, getPostById);
postRouter.put('/:id', authenticateToken, validateUpdatePost, updatePost);
postRouter.delete('/:id', authenticateToken, deletePost);

export default postRouter;
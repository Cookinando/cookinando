import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateCreatePost, validateUpdatePost, } from "../middlewares/validators/postValidator";
import upload from "../middlewares/uploadMiddleware";

const postRouter: Router = express.Router();

postRouter.post('/', authenticateToken, upload.single('image'), validateCreatePost, createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', authenticateToken, getPostById);
postRouter.put('/:id', authenticateToken, upload.single('image'), validateUpdatePost, updatePost);
postRouter.delete('/:id', authenticateToken, deletePost);

export default postRouter;
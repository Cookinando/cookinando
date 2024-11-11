import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware";
import { validateCreatePost, validateUpdatePost, } from "../middlewares/validators/postValidator";
import upload from "../middlewares/uploadMiddleware";

const postRouter: Router = express.Router();

postRouter.post('/', authenticateToken, authorizeAdmin, upload.single('image'), validateCreatePost, createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', authenticateToken, getPostById);
postRouter.put('/:id', authenticateToken, authorizeAdmin, upload.single('image'), validateUpdatePost, updatePost);
postRouter.delete('/:id', authenticateToken, authorizeAdmin, deletePost);

export default postRouter;
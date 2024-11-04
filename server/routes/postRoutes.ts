import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateCreatePost, validateUpdatePost, } from "../middlewares/validators/postValidator";
import upload from "../middlewares/uploadMiddleware";

const postRouter: Router = express.Router();

postRouter.post('/', authenticateToken, validateCreatePost,  upload.single('image'), createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', authenticateToken, getPostById);
postRouter.put('/:id', authenticateToken, validateUpdatePost, upload.single('image'), updatePost);
postRouter.delete('/:id', authenticateToken, deletePost);

export default postRouter;
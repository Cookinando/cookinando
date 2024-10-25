import express, { Router } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController";

const postRouter: Router = express.Router();

postRouter.post('/', createPost);
postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
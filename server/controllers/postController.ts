import { Request, Response } from "express";
import Post from "../models/postModel";

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // const userId = req.user?.id; // El ID del usuario extraído del token JWT

    // if (!userId) {
    //   res.status(401).json({ message: 'Unauthorized' });
    //   return;
    // }
    const { title, numPeople, ingredients, instructions, imageUrl } = req.body;
    const newPost = await Post.create({
      title,
      numPeople,
      ingredients,
      instructions,
      imageUrl
    //   authorId: userId, // Aquí vinculamos el post al usuario logueado
    });
    console.log("✅ Post created successfully");
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "❌ Failed to create a post",
        error: error.message, 
      });
    }
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const allPosts = await Post.findAll();
    console.log("✅ Posts retrieved successfully");
    res.status(200).json(allPosts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "❌ Failed to get posts",
        error: error.message,
      });
    }
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      res.status(404).json({ message: "❌ Post not found" });
      return;
    }
    console.log("✅ Post retrieved successfully");
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "❌ Failed to get post",
        error: error.message,
      });
    }
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, numPeople, ingredients, instructions, imageUrl } = req.body;
    const updatedPost = await Post.update(
      { title, numPeople, ingredients, instructions, imageUrl },
      { where: { id } }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "❌ Post not found" });
      return;
    }
    console.log("✅ Post updated successfully");
    res.status(200).json({ message: "✅ Post updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "❌ Failed to update post",
        error: error.message,
      });
    }
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.destroy({ where: { id } });
    if (!deletedPost) {
      res.status(404).json({ message: "❌ Post not found" });
      return;
    }
    console.log("✅ Post deleted successfully");
    res.status(200).json({ message: "✅ Post deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "❌ Failed to delete post",
        error: error.message,
      });
    }
  }
};
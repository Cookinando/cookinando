import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getPost, getPostById, deletePost, postNewPost, putPost } from "../services/postService.js";

vi.mock("axios");

describe("Post Service", () => {
  const mockToken = "testToken";
  const mockId = 1;
  const mockData = { title: "Test Post", content: "This is a test post." };
  const mockResponse = { data: mockData };

  beforeEach(() => {
    localStorage.setItem("authToken", mockToken);
  });

  describe("getPost", () => {
    test("should return data when GET request is successful", async () => {
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getPost();
      expect(result).toEqual(mockData);
    });

    test("should throw an error when GET request fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getPost()).rejects.toThrow("Network Error");
    });
  });

  describe("getPostById", () => {
    test("should return data when GET request by ID is successful", async () => {
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getPostById(mockId);
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8000/api/posts/${mockId}`, {
        headers: { Authorization: `Bearer ${mockToken}` },
      });
    });

    test("should throw an error when GET request by ID fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("Error fetching post by ID"));

      await expect(getPostById(mockId)).rejects.toThrow("Error fetching post by ID");
    });
  });
  describe("deletePost", () => {
    test("should return data when DELETE request is successful", async () => {
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deletePost(mockId);
      expect(result).toEqual(mockData);
      expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8000/api/posts/${mockId}`, {
        headers: { Authorization: `Bearer ${mockToken}` },
      });
    });

    test("should throw an error when DELETE request fails", async () => {
      axios.delete.mockRejectedValueOnce(new Error("Error deleting post"));

      await expect(deletePost(mockId)).rejects.toThrow("Error deleting post");
    });
  });

  
  
});

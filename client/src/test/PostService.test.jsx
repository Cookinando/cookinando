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

});
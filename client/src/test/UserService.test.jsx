import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getUsers, getUserById, deleteUser, postNewUser, updateUserProfile } from "../services/userService.js";

vi.mock("axios");

describe("User Service", () => {
  const mockToken = "testToken";
  const mockId = 1;
  const mockData = { name: "Test User", email: "test@example.com" };
  const mockResponse = { data: mockData };

  beforeEach(() => {
    localStorage.setItem("authToken", mockToken);
  });

  describe("getUsers", () => {
    test("should return data when GET request is successful", async () => {
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getUsers();
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${mockToken}`, "Content-Type": "application/json" },
      });
    });

    test("should throw an error when token is missing", async () => {
      localStorage.removeItem("authToken");

      await expect(getUsers()).rejects.toThrow("No se encontró el token en localStorage");
    });

    test("should throw an error when GET request fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("Error fetching users"));

      await expect(getUsers()).rejects.toThrow("Error fetching users");
    });
  });

  describe("getUserById", () => {
    test("should return data when GET request by ID is successful", async () => {
      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await getUserById(mockId);
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(`http://localhost:8000/api/users/${mockId}`);
    });

    test("should throw an error when GET request by ID fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("Error fetching user by ID"));

      await expect(getUserById(mockId)).rejects.toThrow("Error fetching user by ID");
    });
  });

  describe("deleteUser", () => {
    test("should return data when DELETE request is successful", async () => {
      axios.delete.mockResolvedValueOnce(mockResponse);

      const result = await deleteUser(mockId);
      expect(result).toEqual(mockData);
      expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8000/api/users/${mockId}`, {
        headers: { Authorization: `Bearer ${mockToken}`, "Content-Type": "application/json" },
      });
    });

    test("should throw an error when token is missing", async () => {
      localStorage.removeItem("authToken");

      await expect(deleteUser(mockId)).rejects.toThrow("No se encontró el token en localStorage");
    });

    test("should throw an error when DELETE request fails", async () => {
      axios.delete.mockRejectedValueOnce(new Error("Error deleting user"));

      await expect(deleteUser(mockId)).rejects.toThrow("Error deleting user");
    });
  });

  describe("postNewUser", () => {
    test("should return data when POST request is successful", async () => {
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await postNewUser(mockData);
      expect(result).toEqual(mockData);
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/users", mockData);
    });

    test("should throw an error when POST request fails", async () => {
      axios.post.mockRejectedValueOnce(new Error("Error creating user"));

      await expect(postNewUser(mockData)).rejects.toThrow("Error creating user");
    });
  });

  describe("updateUserProfile", () => {
    test("should return data when PUT request is successful", async () => {
      axios.put.mockResolvedValueOnce(mockResponse);

      const result = await updateUserProfile(mockId, mockData);
      expect(result).toEqual(mockData);
      expect(axios.put).toHaveBeenCalledWith(`http://localhost:8000/api/users/${mockId}`, mockData, {
        headers: { Authorization: `Bearer ${mockToken}`, "Content-Type": "application/json" },
      });
    });

    test("should throw an error when token is missing", async () => {
      localStorage.removeItem("authToken");

      await expect(updateUserProfile(mockId, mockData)).rejects.toThrow("No se encontró el token en localStorage");
    });

    test("should throw an error when PUT request fails", async () => {
      axios.put.mockRejectedValueOnce(new Error("Error updating user profile"));

      const result = await updateUserProfile(mockId, mockData);
      expect(result.error).toBe("Error updating user profile");
    });
  });
});

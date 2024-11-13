import { describe, test, expect, vi } from "vitest";
import axios from "axios";
import { signUpNewUser, loginUser } from "../services/authService.js";

vi.mock("axios");

describe("Auth Service", () => {
  describe("signUpNewUser", () => {
    test("should return success with data when signup is successful", async () => {
      const mockData = { username: "testuser", password: "testpass" };
      const mockResponse = { data: { id: 1, username: "testuser" } };
      
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await signUpNewUser(mockData);
      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    test("should handle 400 error for invalid data", async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 400 },
      });

      const result = await signUpNewUser({});
      expect(result).toEqual({
        success: false,
        message: "Los datos ingresados no son válidos. Por favor, revisa el formulario.",
      });
    });

    test("should handle network errors gracefully", async () => {
      axios.post.mockRejectedValueOnce({ request: {} });

      const result = await signUpNewUser({});
      expect(result).toEqual({
        success: false,
        message: "No se pudo conectar con el servidor. Verifica tu conexión a Internet.",
      });
    });
  });

  describe("loginUser", () => {
    test("should return success with userData when login is successful", async () => {
      const mockData = { username: "testuser", password: "testpass" };
      const mockResponse = { data: { sessionData: { token: "abc123" } } };
      
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await loginUser(mockData);
      expect(result).toEqual({
        success: true,
        userData: mockResponse.data.sessionData,
      });
    });

    test("should handle 404 error for unregistered user", async () => {
      axios.post.mockRejectedValueOnce({
        response: { status: 404 },
      });

      const result = await loginUser({});
      expect(result).toEqual({
        success: false,
        message: "Ups... Parece que no estás registrado.",
      });
    });

    test("should handle unexpected errors gracefully", async () => {
      axios.post.mockRejectedValueOnce({});

      const result = await loginUser({});
      expect(result).toEqual({
        success: false,
        message: "Ocurrió un error inesperado. Inténtalo más tarde.",
      });
    });
  });
});

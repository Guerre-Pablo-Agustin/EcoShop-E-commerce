// src/api/auth.api.ts
import { API_BASE_URL } from "./config";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  userType: "CUSTOMER" | "BRAND_ADMIN"; // según el Swagger
  password: string;
}

export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  phone?: string;
  // NO tiene token - solo devuelve el usuario creado
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  // Aquí necesitas verificar en el Swagger qué devuelve el /auth/login
  // Probablemente algo como:
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  // Si hay token, agrégalo aquí
}

export const authAPI = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar");
    }

    return response.json();
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log("🚀 ~ login ~ credentials:", credentials);
    const response = await fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log("🚀 ~ login ~ response:", response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    // Si no hay token, el logout puede ser solo limpiar el estado local
    // O verificar si hay un endpoint de logout en el Swagger
  },

  getCurrentUser: async (): Promise<LoginResponse> => {
    const response = await fetch(`/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el usuario actual");
    }

    return response.json();
  },
};

// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI, LoginResponse, RegisterResponse } from "../api/auth.api";

interface AuthState {
  user: LoginResponse | RegisterResponse | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  login: (email: string, password: string) => Promise<void>;
  logout: () => void; // Sin async si no hay endpoint
  clearError: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      // Acciones
      // Login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login({ email, password });
          set({
            user: response, // Guardar el usuario completo
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: () => {
        // Si no hay endpoint de logout, solo limpiar el estado
        set({ user: null, error: null });
      },

      // Clear Error
      clearError: () => set({ error: null }),

      // Register
      register: async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
      ) => {
        set({ isLoading: true, error: null });
        try {
          // Siempre registra como CUSTOMER
          const response = await authAPI.register({
            firstName,
            lastName,
            email,
            password,
            userType: "CUSTOMER",
          });
          set({
            user: response,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },
    }),

    // Persistencia
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user, // Solo persistir el usuario
      }),
    }
  )
);

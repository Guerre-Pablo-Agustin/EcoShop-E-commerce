import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  customerAPI,
  Customer,
  CustomerPageResponse,
  CustomerQueryParams,
  CustomerbyEmail,
} from "../api/customer.api";

interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | CustomerbyEmail | null;
  pagination: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  } | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchCustomers: (params?: CustomerQueryParams) => Promise<void>;
  fetchCustomerById: (id: number) => Promise<void>;
  fetchCustomerByEmail: (email: string) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  clearError: () => void;
  clearCurrentCustomer: () => void;
  updateCustomer: (customerId: number, customer: CustomerbyEmail) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [],
      currentCustomer: null,
      pagination: null,
      isLoading: false,
      error: null,

      // Obtener todos los customers con paginación
      fetchCustomers: async (params?: CustomerQueryParams) => {
        set({ isLoading: true, error: null });
        try {
          const response: CustomerPageResponse = await customerAPI.getAll(
            params
          );
          set({
            customers: response.content,
            pagination: {
              totalElements: response.totalElements,
              totalPages: response.totalPages,
              currentPage: response.number,
              pageSize: response.size,
              first: response.first,
              last: response.last,
              empty: response.empty,
            },
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

      // Obtener un customer por ID
      fetchCustomerById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const customer = await customerAPI.getById(id);
          set({
            currentCustomer: customer,
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

      // Obtener un customer por email
      fetchCustomerByEmail: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          const customer = await customerAPI.getByEmail(email);
          set({
            currentCustomer: customer,
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

      // ✅ OPTIMIZADO: Verificar si un email ya existe
      checkEmailExists: async (email: string): Promise<boolean> => {
        try {
          // Validación básica antes de llamar a la API
          if (!email || email.trim() === "") {
            throw new Error("El email no puede estar vacío");
          }

          return await customerAPI.checkEmailExists(email);
        } catch (error: any) {
          console.error("Error al verificar email:", error);

          // Re-lanzar el error con un mensaje más descriptivo
          if (error?.response?.status === 400) {
            throw new Error(
              "El formato del email no es válido o contiene caracteres no permitidos"
            );
          }

          throw error;
        }
      },

      // ✅ OPTIMIZADO: Actualizar un customer
      updateCustomer: async (customerId: number, customer: CustomerbyEmail) => {
        set({ isLoading: true, error: null });
        try {
          const response = await customerAPI.updateCustomer(customerId, customer);
          set({
            currentCustomer: response,
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



      // Limpiar error
      clearError: () => set({ error: null }),

      // Limpiar customer actual
      clearCurrentCustomer: () => set({ currentCustomer: null }),
    }),

    {
      name: "customer-storage",
      partialize: (state) => ({
        currentCustomer: state.currentCustomer,
      }),
    }
  )
);

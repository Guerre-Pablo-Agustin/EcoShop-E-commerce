import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  customerAPI,
  Customer,
  CustomerPageResponse,
  CustomerQueryParams,
} from "../api/customer.api";

interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
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
          const response: CustomerPageResponse = await customerAPI.getAll(params);
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
          return await customerAPI.checkEmailExists(email);
        } catch (error) {
          console.error("Error al verificar email:", error);
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
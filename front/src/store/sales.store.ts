import { create } from "zustand";
import { persist } from "zustand/middleware";
import { salesApi, AllSale } from "@/api/sales.api";

interface SalesState {
  data: AllSale[];
  isLoading: boolean;
  error: string | null;

  fetchAllTotal: () => Promise<void>;
  fetchPaymentsTotal: () => Promise<void>;
  fetchAllTotalPayments: () => Promise<void>;
  fetchAllTotalByDateRange: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
  fetchByCustomerId: (id: number) => Promise<void>;
  fetchAllByCustomers: () => Promise<void>;
}

export const useSalesStore = create<SalesState>()(
  persist(
    (set) => ({
      data: [],
      isLoading: false,
      error: null,

      fetchAllTotal: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getAllTotal();
          if (res) set({ data: res, isLoading: false });
          else set({ error: "Failed to fetch total sales", isLoading: false });
        } catch (error) {
          set({ error: "Error fetching total sales", isLoading: false });
        }
      },

      fetchPaymentsTotal: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getPaymentsTotal();
          if (res) set({ data: res, isLoading: false });
          else
            set({ error: "Failed to fetch payments total", isLoading: false });
        } catch (error) {
          set({ error: "Error fetching payments total", isLoading: false });
        }
      },

      fetchAllTotalPayments: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getAllTotalPayments();
          if (res) set({ data: res, isLoading: false });
          else
            set({
              error: "Failed to fetch all total payments",
              isLoading: false,
            });
        } catch (error) {
          set({ error: "Error fetching all total payments", isLoading: false });
        }
      },

      fetchAllTotalByDateRange: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getAllTotalByDateRange();
          if (res) set({ data: res, isLoading: false });
          else
            set({
              error: "Failed to fetch total by date range",
              isLoading: false,
            });
        } catch (error) {
          set({
            error: "Error fetching total by date range",
            isLoading: false,
          });
        }
      },

      fetchStatistics: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getAllStadistics();
          if (res) set({ data: res, isLoading: false });
          else set({ error: "Failed to fetch statistics", isLoading: false });
        } catch (error) {
          set({ error: "Error fetching statistics", isLoading: false });
        }
      },

      fetchByCustomerId: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getByCustomerId(id);
          if (res) set({ data: res, isLoading: false });
          else
            set({
              error: "Failed to fetch sales by customer",
              isLoading: false,
            });
        } catch (error) {
          set({ error: "Error fetching sales by customer", isLoading: false });
        }
      },

      fetchAllByCustomers: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await salesApi.getAllByCustomers();
          if (res) set({ data: res, isLoading: false });
          else
            set({
              error: "Failed to fetch sales by customers",
              isLoading: false,
            });
        } catch (error) {
          set({ error: "Error fetching sales by customers", isLoading: false });
        }
      },
    }),
    {
      name: "sales-store",
      partialize: (state) => ({ data: state.data }),
    }
  )
);

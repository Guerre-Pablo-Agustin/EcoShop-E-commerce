import { create } from "zustand";
import { persist } from "zustand/middleware";
import { paymentApi, Payment, CreatePaymentDto } from "@/api/payment.api";

interface PaymentState {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;

  fetchPayments: () => Promise<void>;
  getPayment: (id: number) => Promise<Payment | null>;
  createPayment: (payload: CreatePaymentDto) => Promise<Payment | null>;
  updatePayment: (
    id: number,
    payload: Partial<CreatePaymentDto>
  ) => Promise<Payment | null>;
  deletePayment: (id: number) => Promise<boolean>;
  getByDateRange: (fromIso: string, toIso: string) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      payments: [],
      isLoading: false,
      error: null,

      fetchPayments: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await paymentApi.getAll();
          if (data) set({ payments: data, isLoading: false });
          else set({ error: "Failed to fetch payments", isLoading: false });
        } catch (error) {
          set({ error: "Error fetching payments", isLoading: false });
        }
      },

      getPayment: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const p = await paymentApi.getById(id);
          set({ isLoading: false });
          return p;
        } catch (error) {
          set({ error: "Error getting payment", isLoading: false });
          return null;
        }
      },

      createPayment: async (payload: CreatePaymentDto) => {
        console.log(
          "PaymentStore: createPayment llamado con payload:",
          payload
        );
        set({ isLoading: true, error: null });
        try {
          const p = await paymentApi.createPayment(payload);
          if (p) {
            set((state) => ({
              payments: [...state.payments, p],
              isLoading: false,
            }));
            return p;
          }
          set({ error: "Failed to create payment", isLoading: false });
          return null;
        } catch (error) {
          set({ error: "Error creating payment", isLoading: false });
          return null;
        }
      },

      updatePayment: async (id: number, payload: Partial<CreatePaymentDto>) => {
        set({ isLoading: true, error: null });
        try {
          const p = await paymentApi.updatePayment(id, payload);
          if (p) {
            set((state) => ({
              payments: state.payments.map((x) => (x.id === id ? p : x)),
              isLoading: false,
            }));
            return p;
          }
          set({ error: "Failed to update payment", isLoading: false });
          return null;
        } catch (error) {
          set({ error: "Error updating payment", isLoading: false });
          return null;
        }
      },

      deletePayment: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const ok = await paymentApi.deletePayment(id);
          if (ok) {
            set((state) => ({
              payments: state.payments.filter((x) => x.id !== id),
              isLoading: false,
            }));
            return true;
          }
          set({ error: "Failed to delete payment", isLoading: false });
          return false;
        } catch (error) {
          set({ error: "Error deleting payment", isLoading: false });
          return false;
        }
      },

      getByDateRange: async (fromIso: string, toIso: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await paymentApi.getByDateRange(fromIso, toIso);
          if (data) set({ payments: data, isLoading: false });
          else
            set({
              error: "Failed to fetch payments by date",
              isLoading: false,
            });
        } catch (error) {
          set({ error: "Error fetching payments by date", isLoading: false });
        }
      },
    }),
    {
      name: "payment-store",
      partialize: (state) => ({ payments: state.payments }),
    }
  )
);

import { API_BASE_URL } from "./config";

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  paymentDate: string; // ISO
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePaymentDto {
  orderId: number;
  amount: number;
  paymentDate: string; // ISO
}

export const paymentApi = {
  getAll: async (): Promise<Payment[] | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments`, {
        method: "GET",
      });
      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error("paymentApi.getAll error:", error);
      return null;
    }
  },

  getById: async (id: number): Promise<Payment | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/${id}`, {
        method: "GET",
      });
      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error("paymentApi.getById error:", error);
      return null;
    }
  },

  createPayment: async (payload: CreatePaymentDto): Promise<Payment | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("paymentApi.createPayment failed:", res.status, text);
        throw new Error(`Network response was not ok: ${res.status} - ${text}`);
      }
      return res.json();
    } catch (error) {
      console.error("paymentApi.createPayment error:", error);
      return null;
    }
  },

  updatePayment: async (
    id: number,
    payload: Partial<CreatePaymentDto>
  ): Promise<Payment | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error("paymentApi.updatePayment error:", error);
      return null;
    }
  },

  deletePayment: async (id: number): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/payments/${id}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch (error) {
      console.error("paymentApi.deletePayment error:", error);
      return false;
    }
  },

  getByDateRange: async (
    fromIso: string,
    toIso: string
  ): Promise<Payment[] | null> => {
    try {
      const url = `${API_BASE_URL}/api/payments/by-date-range?from=${encodeURIComponent(
        fromIso
      )}&to=${encodeURIComponent(toIso)}`;
      const res = await fetch(url, { method: "GET" });
      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    } catch (error) {
      console.error("paymentApi.getByDateRange error:", error);
      return null;
    }
  },
};

import { Order } from "@/types/Order.types";
import { API_BASE_URL } from "./config";

export interface CreateOrderDto {
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  paymentDetails?: {
    paypalOrderId?: string;
    paypalPayerId?: string;
    paypalStatus?: string;
    transactionId?: string;
  };
  items?: Array<{
    productId: number;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface UpdateOrderStatusDto {
  status: string;
}

export const orderApi = {
  // Obtener orden por ID (GET)
  getById: async (id: number): Promise<Order | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Obtener órdenes de un cliente (GET)
  getByCustomerId: async (customerId: number): Promise<Order[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/customer/${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Crear nueva orden (POST)
  create: async (customerId: number): Promise<Order | null> => {
    try {
      console.log("customerId", customerId);
      const response = await fetch(
        `${API_BASE_URL}/api/orders/customer/${customerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerId),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Actualizar estado de orden (PATCH)
  updateStatus: async (
    orderId: number,
    status: UpdateOrderStatusDto
  ): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(status),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Marcar como enviada (POST)
  ship: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/ship`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Marcar como entregada (POST)
  deliver: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/deliver`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Confirmar orden (POST)
  confirm: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Confirmar recepción (POST)
  confirmDelivery: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/confirm-delivery`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Cancelar orden (POST)
  cancel: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Calcular impacto ambiental (POST)
  calculateImpact: async (orderId: number): Promise<Order | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders/${orderId}/calculate-impact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

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

export interface OrderByCustomerDto {
  id: number;
  co2Saved: number;
  customerId: number;
  deliveryDate: string | null;
  ecoPointsEarned: number | null;
  items: Array<{
    carbonFootprint: number;
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
  }>;
  orderDate: string;
  orderNumber: string;
  payment: {
    amount: number;
    id: number;
    paymentDate: string;
  };
  shippingDate: string | null;
  status: string;
  totalAmount: number;
  totalCarbonFootprint: number;
  shippingAddress: {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  } | null;
}

export interface UpdateOrderStatusDto {
  status: string;
}

export interface OrderQueryParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface OrderPageResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  size: number;
  content: OrderByCustomerDto[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const orderApi = {
  //getAll
  getAll: async (params?: OrderQueryParams): Promise<OrderPageResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append("size", params.size.toString());
    }
    if (params?.sort) {
      queryParams.append("sort", params.sort);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/orders?${queryParams.toString()}`,
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
      throw error;
    }
  },

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
  // El backend crea la orden desde el carrito del cliente que ya está sincronizado
  create: async (customerId: number): Promise<Order | null> => {
    try {
      console.log("📤 Creando orden desde el carrito del cliente:", customerId);
      const response = await fetch(
        `${API_BASE_URL}/api/orders/customer/${customerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // No se envía body, el backend usa el carrito del servidor
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error del backend:", errorText);
        throw new Error(
          `Failed to create order: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    } catch (error) {
      console.error("❌ Error al crear orden:", error);
      throw error;
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

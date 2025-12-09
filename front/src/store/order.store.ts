import { create } from "zustand";
import { Order } from "@/types/Order.types";
import {
  orderApi,
  CreateOrderDto,
  UpdateOrderStatusDto,
} from "@/api/order.api";

interface OrderStore {
  orders: Order[];
  selectedOrder: Order | null;
  customerOrders: Order[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchOrderById: (id: number) => Promise<void>;
  fetchOrdersByCustomerId: (customerId: number) => Promise<void>;
  createOrder: (customerId: number) => Promise<void>;
  updateOrderStatus: (
    orderId: number,
    status: UpdateOrderStatusDto
  ) => Promise<void>;
  shipOrder: (orderId: number) => Promise<void>;
  deliverOrder: (orderId: number) => Promise<void>;
  confirmOrder: (orderId: number) => Promise<void>;
  confirmDelivery: (orderId: number) => Promise<void>;
  cancelOrder: (orderId: number) => Promise<void>;
  calculateImpact: (orderId: number) => Promise<void>;
  setSelectedOrder: (order: Order | null) => void;
  clearError: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  selectedOrder: null,
  customerOrders: [],
  isLoading: false,
  error: null,

  // Obtener orden por ID
  fetchOrderById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const order = await orderApi.getById(id);
      if (order) {
        set({ selectedOrder: order, isLoading: false });
      } else {
        set({
          error: "Order not found",
          isLoading: false,
          selectedOrder: null,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error fetching order",
        isLoading: false,
        selectedOrder: null,
      });
    }
  },

  // Obtener órdenes de un cliente
  fetchOrdersByCustomerId: async (customerId: number) => {
    set({ isLoading: true, error: null });
    try {
      const orders = await orderApi.getByCustomerId(customerId);
      set({ customerOrders: orders, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error fetching customer orders",
        isLoading: false,
      });
    }
  },

  // Crear orden
  createOrder: async (customerId: number) => {
    set({ isLoading: true, error: null });
    try {
      const newOrder = await orderApi.create(customerId);
      if (newOrder) {
        set((state) => ({
          customerOrders: [...state.customerOrders, newOrder],
          selectedOrder: newOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to create order",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error creating order",
        isLoading: false,
      });
    }
  },

  // Actualizar estado de orden
  updateOrderStatus: async (orderId: number, status: UpdateOrderStatusDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.updateStatus(orderId, status);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to update order status",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error updating order status",
        isLoading: false,
      });
    }
  },

  // Marcar como enviada
  shipOrder: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.ship(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to ship order",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error shipping order",
        isLoading: false,
      });
    }
  },

  // Marcar como entregada
  deliverOrder: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.deliver(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to deliver order",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error delivering order",
        isLoading: false,
      });
    }
  },

  // Confirmar orden
  confirmOrder: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.confirm(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to confirm order",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error confirming order",
        isLoading: false,
      });
    }
  },

  // Confirmar recepción
  confirmDelivery: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.confirmDelivery(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to confirm delivery",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error confirming delivery",
        isLoading: false,
      });
    }
  },

  // Cancelar orden
  cancelOrder: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.cancel(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to cancel order",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error canceling order",
        isLoading: false,
      });
    }
  },

  // Calcular impacto ambiental
  calculateImpact: async (orderId: number) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await orderApi.calculateImpact(orderId);
      if (updatedOrder) {
        set((state) => ({
          customerOrders: state.customerOrders.map((o) =>
            o.id === orderId ? updatedOrder : o
          ),
          selectedOrder:
            state.selectedOrder?.id === orderId
              ? updatedOrder
              : state.selectedOrder,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to calculate impact",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error calculating impact",
        isLoading: false,
      });
    }
  },

  // Establecer orden seleccionada
  setSelectedOrder: (order: Order | null) => {
    set({ selectedOrder: order });
  },

  // Limpiar error
  clearError: () => {
    set({ error: null });
  },
}));

// Custom hooks para acceder a partes específicas del store
export const useOrders = () => useOrderStore((state) => state.orders);
export const useSelectedOrder = () =>
  useOrderStore((state) => state.selectedOrder);
export const useCustomerOrders = () =>
  useOrderStore((state) => state.customerOrders);
export const useOrderLoading = () => useOrderStore((state) => state.isLoading);
export const useOrderError = () => useOrderStore((state) => state.error);

// Hook para todas las acciones
export const useOrderActions = () => {
  const fetchOrderById = useOrderStore((state) => state.fetchOrderById);
  const fetchOrdersByCustomerId = useOrderStore(
    (state) => state.fetchOrdersByCustomerId
  );
  const createOrder = useOrderStore((state) => state.createOrder);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const shipOrder = useOrderStore((state) => state.shipOrder);
  const deliverOrder = useOrderStore((state) => state.deliverOrder);
  const confirmOrder = useOrderStore((state) => state.confirmOrder);
  const confirmDelivery = useOrderStore((state) => state.confirmDelivery);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);
  const calculateImpact = useOrderStore((state) => state.calculateImpact);
  const setSelectedOrder = useOrderStore((state) => state.setSelectedOrder);
  const clearError = useOrderStore((state) => state.clearError);

  return {
    fetchOrderById,
    fetchOrdersByCustomerId,
    createOrder,
    updateOrderStatus,
    shipOrder,
    deliverOrder,
    confirmOrder,
    confirmDelivery,
    cancelOrder,
    calculateImpact,
    setSelectedOrder,
    clearError,
  };
};

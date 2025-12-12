import { ShoppingCart } from "@/types/ShoppingCart.types";
import { CartItem } from "@/types/CartItem.types";
import { API_BASE_URL } from "./config";

export interface AddItemDto {
  productId: number;
  quantity: number;
}

export interface UpdateQuantityDto {
  quantity: number;
}

export interface CartSummary {
  itemCount: number;
  total: number;
  estimatedCarbonFootprint: number;
}

export const cartApi = {
  // Actualizar cantidad de un item (PUT)
  updateItemQuantity: async (
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<CartItem | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/cart/customer/${customerId}/items/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
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

  // Eliminar item del carrito (DELETE)
  deleteItem: async (customerId: number, productId: number): Promise<void> => {
    try {
      const response = await fetch(
        `/api/cart/customer/${customerId}/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Agregar item al carrito (POST)
  addItem: async (
    customerId: number,
    productId: number,
    quantity: number = 1
  ): Promise<CartItem | null> => {
    try {
      // Construir URL con query params: ?productId=X&quantity=Y
      const queryString = `productId=${productId}&quantity=${quantity}`;
      const response = await fetch(
        `${API_BASE_URL}/api/cart/customer/${customerId}/items?${queryString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const text = await response.text();
        let parsed: any = text;
        try {
          parsed = JSON.parse(text);
        } catch (e) {
          // keep raw text
        }
        console.error("cartApi.addItem failed:", response.status, parsed);
        throw new Error(
          `Network response was not ok: ${response.status} - ${text}`
        );
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Aumentar cantidad (PATCH)
  increaseQuantity: async (
    customerId: number,
    productId: number
  ): Promise<CartItem | null> => {
    try {
      const response = await fetch(
        `/api/cart/customer/${customerId}/items/${productId}/increase`,
        {
          method: "PATCH",
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

  // Disminuir cantidad (PATCH)
  decreaseQuantity: async (
    customerId: number,
    productId: number
  ): Promise<CartItem | null> => {
    try {
      const response = await fetch(
        `/api/cart/customer/${customerId}/items/${productId}/decrease`,
        {
          method: "PATCH",
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

  // Obtener carrito (GET)
  getCart: async (customerId: number): Promise<ShoppingCart | null> => {
    try {
      const response = await fetch(`/api/cart/customer/${customerId}`, {
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

  // Limpiar carrito (DELETE)
  clearCart: async (customerId: number): Promise<void> => {
    try {
      const response = await fetch(`/api/cart/customer/${customerId}/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Obtener total del carrito (GET)
  getCartTotal: async (customerId: number): Promise<number | null> => {
    try {
      const response = await fetch(`/api/cart/customer/${customerId}/total`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.total;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  // Obtener resumen del carrito (GET)
  getCartSummary: async (customerId: number): Promise<CartSummary | null> => {
    try {
      const response = await fetch(`/api/cart/customer/${customerId}/summary`, {
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

  // Verificar si un item existe en el carrito (GET)
  checkItemExists: async (
    customerId: number,
    productId: number
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/cart/customer/${customerId}/items/${productId}/exists`,
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
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // Contar items en el carrito (GET)
  getItemCount: async (customerId: number): Promise<number> => {
    try {
      const response = await fetch(`/api/cart/customer/${customerId}/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.log(error);
      return 0;
    }
  },
};

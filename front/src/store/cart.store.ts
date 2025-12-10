import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShoppingCart } from "@/types/ShoppingCart.types";
import { CartItem } from "@/types/CartItem.types";
import { Product } from "@/types/Product.types";
import { cartApi } from "@/api/cart.api";

interface CartStore {
  cart: ShoppingCart;
  customerId: number | null;
  isLoading: boolean;
  error: string | null;

  // Setters
  setCustomerId: (customerId: number) => void;

  // Local actions (mantienen compatibilidad con código existente)
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // API actions (integración con backend)
  fetchCart: () => Promise<void>;
  addItemToBackend: (productId: number, quantity?: number) => Promise<void>;
  removeItemFromBackend: (productId: number) => Promise<void>;
  updateItemQuantityInBackend: (
    productId: number,
    quantity: number
  ) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  clearCartInBackend: () => Promise<void>;
  getCartSummary: () => Promise<void>;
  checkItemExists: (productId: number) => Promise<boolean>;
}

// Helper para calcular totales
const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.subTotal, 0);
  // const estimatedCarbonFootprint = items.reduce(
  //   (sum, item) => sum + item.itemCarbonFootprint,
  //   0
  // );
  return {
    total,
    // estimatedCarbonFootprint
  };
};

// Helper para crear CartItem desde Product
const createCartItem = (product: Product, quantity: number = 1): CartItem => {
  const unitPrice = product.price;
  const subTotal = unitPrice * quantity;
  // const itemCarbonFootprint = product.environmentalData.carbonFootprint * quantity;

  return {
    id: `${product.id}-${Date.now()}`, // ID único para el item del carrito
    product,
    quantity,
    unitPrice,
    subTotal,
    // itemCarbonFootprint,
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        id: "cart-1",
        items: [],
        total: 0,
        estimatedCarbonFootprint: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      customerId: null,
      isLoading: false,
      error: null,

      setCustomerId: (customerId: number) => {
        set({ customerId });
      },

      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          // Verificar si el producto ya existe en el carrito
          const existingItemIndex = state.cart.items.findIndex(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            // Si existe, actualizar cantidad
            newItems = state.cart.items.map((item, index) => {
              if (index === existingItemIndex) {
                const newQuantity = item.quantity + quantity;
                return {
                  ...item,
                  quantity: newQuantity,
                  subTotal: item.unitPrice * newQuantity,
                  // itemCarbonFootprint:
                  //   product.environmentalData.carbonFootprint * newQuantity,
                };
              }
              return item;
            });
          } else {
            // Si no existe, crear nuevo item
            const newItem = createCartItem(product, quantity);
            newItems = [...state.cart.items, newItem];
          }

          const { 
            total, 
            // estimatedCarbonFootprint 
          } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              // estimatedCarbonFootprint,
              updatedAt: new Date(),
            },
          };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => {
          const newItems = state.cart.items.filter(
            (item) => item.id !== itemId
          );
          const { 
            total, 
            // estimatedCarbonFootprint
           } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              // estimatedCarbonFootprint,
              updatedAt: new Date(),
            },
          };
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Si la cantidad es 0 o menor, eliminar el item
            const newItems = state.cart.items.filter(
              (item) => item.id !== itemId
            );
            const { 
              total, 
              // estimatedCarbonFootprint 
            } =
              calculateTotals(newItems);

            return {
              cart: {
                ...state.cart,
                items: newItems,
                total,
                //
                updatedAt: new Date(),
              },
            };
          }

          const newItems = state.cart.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity,
                subTotal: item.unitPrice * quantity,
                itemCarbonFootprint:
                  item.product.environmentalData.carbonFootprint * quantity,
              };
            }
            return item;
          });

          const { 
            total, 
            // estimatedCarbonFootprint 
          } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              // estimatedCarbonFootprint,
              updatedAt: new Date(),
            },
          };
        });
      },

      clearCart: () => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: [],
            total: 0,
            estimatedCarbonFootprint: 0,
            updatedAt: new Date(),
          },
        }));
      },

      // ==================== API METHODS ====================

      // Obtener carrito desde el backend
      fetchCart: async () => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.getCart(customerId);
          if (cart) {
            set({ cart, isLoading: false });
          } else {
            set({ error: "Failed to fetch cart", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error fetching cart", isLoading: false });
        }
      },

      // Agregar item al backend
      addItemToBackend: async (productId: number, quantity: number = 1) => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        console.log("Adding item to backend:", { productId, quantity });

        set({ isLoading: true, error: null });
        try {
          const item = await cartApi.addItem(customerId, productId, quantity);
          if (item) {
            // Refrescar el carrito completo
            await get().fetchCart();
          } else {
            set({ error: "Failed to add item", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error adding item", isLoading: false });
        }
      },

      // Eliminar item del backend
      removeItemFromBackend: async (productId: number) => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await cartApi.deleteItem(customerId, productId);
          // Refrescar el carrito completo
          await get().fetchCart();
        } catch (error) {
          set({ error: "Error removing item", isLoading: false });
        }
      },

      // Actualizar cantidad de item en el backend
      updateItemQuantityInBackend: async (
        productId: number,
        quantity: number
      ) => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const item = await cartApi.updateItemQuantity(
            customerId,
            productId,
            quantity
          );
          if (item) {
            // Refrescar el carrito completo
            await get().fetchCart();
          } else {
            set({ error: "Failed to update quantity", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error updating quantity", isLoading: false });
        }
      },

      // Aumentar cantidad de item
      increaseItemQuantity: async (productId: number) => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const item = await cartApi.increaseQuantity(customerId, productId);
          if (item) {
            // Refrescar el carrito completo
            await get().fetchCart();
          } else {
            set({ error: "Failed to increase quantity", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error increasing quantity", isLoading: false });
        }
      },

      // Disminuir cantidad de item
      decreaseItemQuantity: async (productId: number) => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const item = await cartApi.decreaseQuantity(customerId, productId);
          if (item) {
            // Refrescar el carrito completo
            await get().fetchCart();
          } else {
            set({ error: "Failed to decrease quantity", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error decreasing quantity", isLoading: false });
        }
      },

      // Limpiar carrito en el backend
      clearCartInBackend: async () => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await cartApi.clearCart(customerId);
          // Limpiar también el estado local
          set((state) => ({
            cart: {
              ...state.cart,
              items: [],
              total: 0,
              estimatedCarbonFootprint: 0,
              updatedAt: new Date(),
            },
            isLoading: false,
          }));
        } catch (error) {
          set({ error: "Error clearing cart", isLoading: false });
        }
      },

      // Obtener resumen del carrito
      getCartSummary: async () => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const summary = await cartApi.getCartSummary(customerId);
          if (summary) {
            // Actualizar solo los campos del resumen
            set((state) => ({
              cart: {
                ...state.cart,
                total: summary.total,
                estimatedCarbonFootprint: summary.estimatedCarbonFootprint,
              },
              isLoading: false,
            }));
          } else {
            set({ error: "Failed to get cart summary", isLoading: false });
          }
        } catch (error) {
          set({ error: "Error getting cart summary", isLoading: false });
        }
      },

      // Verificar si un item existe en el carrito
      checkItemExists: async (productId: number): Promise<boolean> => {
        const { customerId } = get();
        if (!customerId) {
          set({ error: "No customer ID set" });
          return false;
        }

        try {
          return await cartApi.checkItemExists(customerId, productId);
        } catch (error) {
          set({ error: "Error checking item existence" });
          return false;
        }
      },
    }),
    {
      name: "ecocommerce-cart", // nombre de la key en localStorage
      // Personalizar cómo se serializa/deserializa
      partialize: (state) => ({ cart: state.cart }),
      // Opcional: migrar datos si cambias la estructura
      version: 1,
    }
  )
);

// Hooks personalizados para acceder a partes específicas del store
export const useCart = () => useCartStore((state) => state.cart);
export const useCartItems = () => useCartStore((state) => state.cart.items);
export const useCartTotal = () => useCartStore((state) => state.cart.total);
export const useCartLoading = () => useCartStore((state) => state.isLoading);
export const useCartError = () => useCartStore((state) => state.error);

// Hook para acciones locales (compatibilidad con código existente)
export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return { addItem, removeItem, updateQuantity, clearCart };
};

// Hook para acciones del backend
export const useCartBackendActions = () => {
  const setCustomerId = useCartStore((state) => state.setCustomerId);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const addItemToBackend = useCartStore((state) => state.addItemToBackend);
  const removeItemFromBackend = useCartStore(
    (state) => state.removeItemFromBackend
  );
  const updateItemQuantityInBackend = useCartStore(
    (state) => state.updateItemQuantityInBackend
  );
  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity
  );
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity
  );
  const clearCartInBackend = useCartStore((state) => state.clearCartInBackend);
  const getCartSummary = useCartStore((state) => state.getCartSummary);
  const checkItemExists = useCartStore((state) => state.checkItemExists);

  return {
    setCustomerId,
    fetchCart,
    addItemToBackend,
    removeItemFromBackend,
    updateItemQuantityInBackend,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCartInBackend,
    getCartSummary,
    checkItemExists,
  };
};

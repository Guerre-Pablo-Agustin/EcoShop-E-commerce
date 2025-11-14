import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  itemCarbonFootprint: number;
}

export interface ShoppingCart {
  id: string;
  items: CartItem[];
  total: number;
  estimatedCarbonFootprint: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CartStore {
  cart: ShoppingCart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper para calcular totales
const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.subTotal, 0);
  const estimatedCarbonFootprint = items.reduce(
    (sum, item) => sum + item.itemCarbonFootprint,
    0
  );
  return { total, estimatedCarbonFootprint };
};

// Helper para crear CartItem desde Product
const createCartItem = (product: Product, quantity: number = 1): CartItem => {
  const unitPrice = product.price;
  const subTotal = unitPrice * quantity;
  const itemCarbonFootprint = product.impact.carbonFootprint * quantity;

  return {
    id: `${product.id}-${Date.now()}`, // ID único para el item del carrito
    product,
    quantity,
    unitPrice,
    subTotal,
    itemCarbonFootprint,
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: {
        id: "cart-1",
        items: [],
        total: 0,
        estimatedCarbonFootprint: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
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
                  itemCarbonFootprint:
                    product.impact.carbonFootprint * newQuantity,
                };
              }
              return item;
            });
          } else {
            // Si no existe, crear nuevo item
            const newItem = createCartItem(product, quantity);
            newItems = [...state.cart.items, newItem];
          }

          const { total, estimatedCarbonFootprint } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              estimatedCarbonFootprint,
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
          const { total, estimatedCarbonFootprint } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              estimatedCarbonFootprint,
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
            const { total, estimatedCarbonFootprint } =
              calculateTotals(newItems);

            return {
              cart: {
                ...state.cart,
                items: newItems,
                total,
                estimatedCarbonFootprint,
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
                  item.product.impact.carbonFootprint * quantity,
              };
            }
            return item;
          });

          const { total, estimatedCarbonFootprint } = calculateTotals(newItems);

          return {
            cart: {
              ...state.cart,
              items: newItems,
              total,
              estimatedCarbonFootprint,
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
export const useCartActions = () => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return { addItem, removeItem, updateQuantity, clearCart };
};

import { create } from "zustand";
import { Product } from "@/types/Product.types";
import {
  productApi,
  CreateProductDto,
  UpdateProductDto,
} from "@/api/product.api";

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchProductsByBrand: (brandId: number) => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
  updateProduct: (id: string, product: UpdateProductDto) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  clearError: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  // Obtener todos los productos
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await productApi.getAll();
      set({ products, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error fetching products",
        isLoading: false,
      });
    }
  },

  // Obtener producto por ID
  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const product = await productApi.getById(id);
      if (product) {
        set({ selectedProduct: product, isLoading: false });
      } else {
        set({
          error: "Product not found",
          isLoading: false,
          selectedProduct: null,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error fetching product",
        isLoading: false,
        selectedProduct: null,
      });
    }
  },

  // Obtener productos por marca
  fetchProductsByBrand: async (brandId: number) => {
    set({ isLoading: true, error: null });
    try {
      const products = await productApi.getByBrand(brandId);
      set({ products, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Error fetching products by brand",
        isLoading: false,
      });
    }
  },

  // Crear producto
  createProduct: async (product: CreateProductDto) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct = await productApi.create(product);
      if (newProduct) {
        set((state) => ({
          products: [...state.products, newProduct],
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to create product",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error creating product",
        isLoading: false,
      });
    }
  },

  // Actualizar producto
  updateProduct: async (id: string, product: UpdateProductDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProduct = await productApi.update(id, product);
      if (updatedProduct) {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? updatedProduct : p
          ),
          selectedProduct:
            state.selectedProduct?.id === id
              ? updatedProduct
              : state.selectedProduct,
          isLoading: false,
        }));
      } else {
        set({
          error: "Failed to update product",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error updating product",
        isLoading: false,
      });
    }
  },

  // Eliminar producto
  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await productApi.delete(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        selectedProduct:
          state.selectedProduct?.id === id ? null : state.selectedProduct,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Error deleting product",
        isLoading: false,
      });
    }
  },

  // Establecer producto seleccionado
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  // Limpiar error
  clearError: () => {
    set({ error: null });
  },
}));

// Custom hooks para acceder a partes específicas del store
export const useProducts = () => useProductStore((state) => state.products);
export const useSelectedProduct = () =>
  useProductStore((state) => state.selectedProduct);
export const useProductLoading = () =>
  useProductStore((state) => state.isLoading);
export const useProductError = () => useProductStore((state) => state.error);

// Hook para todas las acciones
export const useProductActions = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const fetchProductsByBrand = useProductStore(
    (state) => state.fetchProductsByBrand
  );
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct
  );
  const clearError = useProductStore((state) => state.clearError);

  return {
    fetchProducts,
    fetchProductById,
    fetchProductsByBrand,
    createProduct,
    updateProduct,
    deleteProduct,
    setSelectedProduct,
    clearError,
  };
};

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { brandsApi } from "../api/brands.api";
import { Brand, CreateBrandDto } from "../types/Brand.types";

interface BrandState {
  brands: Brand[];
  currentBrand: Brand | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchBrands: () => Promise<void>;
  fetchBrandById: (id: number) => Promise<void>;
  createBrand: (brand: CreateBrandDto) => Promise<void>;
  updateBrand: (brand: Brand) => Promise<void>;
  deleteBrand: (id: number) => Promise<void>;
  clearError: () => void;
  clearCurrentBrand: () => void;
}

export const useBrandStore = create<BrandState>()(
  persist(
    (set) => ({
      brands: [],
      currentBrand: null,
      isLoading: false,
      error: null,

      // Obtener todas las marcas
      fetchBrands: async () => {
        set({ isLoading: true, error: null });
        try {
          const brands = await brandsApi.getAll();
          set({
            brands: brands || [],
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Obtener una marca por ID
      fetchBrandById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const brand = await brandsApi.getById(id);
          set({
            currentBrand: brand,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Crear una nueva marca
      createBrand: async (brand: CreateBrandDto) => {
        set({ isLoading: true, error: null });
        try {
          const newBrand = await brandsApi.create(brand);
          if (newBrand) {
            set((state) => ({
              brands: [...state.brands, newBrand],
              isLoading: false,
            }));
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Actualizar una marca existente
      updateBrand: async (brand: Brand) => {
        set({ isLoading: true, error: null });
        try {
          const updatedBrand = await brandsApi.update(brand);
          if (updatedBrand) {
            set((state) => ({
              brands: state.brands.map((b) =>
                b.id === updatedBrand.id ? updatedBrand : b
              ),
              currentBrand:
                state.currentBrand?.id === updatedBrand.id
                  ? updatedBrand
                  : state.currentBrand,
              isLoading: false,
            }));
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Eliminar una marca
      deleteBrand: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          await brandsApi.delete(id);
          set((state) => ({
            brands: state.brands.filter((b) => b.id !== id.toString()),
            currentBrand:
              state.currentBrand?.id === id.toString()
                ? null
                : state.currentBrand,
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
          throw error;
        }
      },

      // Limpiar error
      clearError: () => set({ error: null }),

      // Limpiar marca actual
      clearCurrentBrand: () => set({ currentBrand: null }),
    }),

    {
      name: "brand-storage",
      partialize: (state) => ({
        currentBrand: state.currentBrand,
      }),
    }
  )
);

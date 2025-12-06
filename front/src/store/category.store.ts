import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoriesApi } from "../api/categories.api";
import { Category, CreateCategoryDto } from "../types/Category.types";

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: number) => Promise<void>;
  createCategory: (category: CreateCategoryDto) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  clearError: () => void;
  clearCurrentCategory: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      currentCategory: null,
      isLoading: false,
      error: null,

      // Obtener todas las categorías
      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const categories = await categoriesApi.getAll();
          set({
            categories: categories || [],
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

      // Obtener una categoría por ID
      fetchCategoryById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const category = await categoriesApi.getById(id);
          set({
            currentCategory: category,
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

      // Crear una nueva categoría
      createCategory: async (category: CreateCategoryDto) => {
        set({ isLoading: true, error: null });
        try {
          const newCategory = await categoriesApi.create(category);
          if (newCategory) {
            set((state) => ({
              categories: [...state.categories, newCategory],
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

      // Actualizar una categoría existente
      updateCategory: async (category: Category) => {
        set({ isLoading: true, error: null });
        try {
          const updatedCategory = await categoriesApi.update(category);
          if (updatedCategory) {
            set((state) => ({
              categories: state.categories.map((c) =>
                c.id === updatedCategory.id ? updatedCategory : c
              ),
              currentCategory:
                state.currentCategory?.id === updatedCategory.id
                  ? updatedCategory
                  : state.currentCategory,
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

      // Eliminar una categoría
      deleteCategory: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          await categoriesApi.delete(id);
          set((state) => ({
            categories: state.categories.filter((c) => c.id !== id),
            currentCategory:
              state.currentCategory?.id === id ? null : state.currentCategory,
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

      // Limpiar categoría actual
      clearCurrentCategory: () => set({ currentCategory: null }),
    }),

    {
      name: "category-storage",
      partialize: (state) => ({
        currentCategory: state.currentCategory,
      }),
    }
  )
);

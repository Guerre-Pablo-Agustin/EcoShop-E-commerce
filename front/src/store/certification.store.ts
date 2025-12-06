import { create } from "zustand";
import { persist } from "zustand/middleware";
import { certificationsApi } from "../api/certifications.api";
import { Certification, CertificationPost } from "../types/Certification.types";

interface CertificationState {
  certifications: Certification[];
  currentCertification: Certification | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchCertifications: () => Promise<void>;
  fetchCertificationById: (id: number) => Promise<void>;
  createCertification: (certification: CertificationPost) => Promise<void>;
  updateCertification: (certification: Certification) => Promise<void>;
  deleteCertification: (id: number) => Promise<void>;
  clearError: () => void;
  clearCurrentCertification: () => void;
}

export const useCertificationStore = create<CertificationState>()(
  persist(
    (set) => ({
      certifications: [],
      currentCertification: null,
      isLoading: false,
      error: null,

      // Obtener todas las certificaciones
      fetchCertifications: async () => {
        set({ isLoading: true, error: null });
        try {
          const certifications = await certificationsApi.getAll();
          set({
            certifications: certifications || [],
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

      // Obtener una certificación por ID
      fetchCertificationById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          const certification = await certificationsApi.getById(id);
          set({
            currentCertification: certification,
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

      // Crear una nueva certificación
      createCertification: async (certification: CertificationPost) => {
        set({ isLoading: true, error: null });
        try {
          const newCertification = await certificationsApi.create(
            certification
          );
          if (newCertification) {
            set((state) => ({
              certifications: [...state.certifications, newCertification],
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

      // Actualizar una certificación existente
      updateCertification: async (certification: Certification) => {
        set({ isLoading: true, error: null });
        try {
          const updatedCertification = await certificationsApi.update(
            certification
          );
          if (updatedCertification) {
            set((state) => ({
              certifications: state.certifications.map((c) =>
                c.id === updatedCertification.id ? updatedCertification : c
              ),
              currentCertification:
                state.currentCertification?.id === updatedCertification.id
                  ? updatedCertification
                  : state.currentCertification,
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

      // Eliminar una certificación
      deleteCertification: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
          await certificationsApi.delete(id);
          set((state) => ({
            certifications: state.certifications.filter((c) => c.id !== id),
            currentCertification:
              state.currentCertification?.id === id
                ? null
                : state.currentCertification,
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

      // Limpiar certificación actual
      clearCurrentCertification: () => set({ currentCertification: null }),
    }),

    {
      name: "certification-storage",
      partialize: (state) => ({
        currentCertification: state.currentCertification,
      }),
    }
  )
);

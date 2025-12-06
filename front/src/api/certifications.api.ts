import { Certification, CertificationPost } from "@/types/Certification.types";

export const certificationsApi = {
  //obtener todas las certificaciones
  getAll: async () => {
    try {
      const response = await fetch("/api/certifications", {
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
    }
  },

  //obtener una certificación por id
  getById: async (id: number): Promise<Certification | null> => {
    try {
      const response = await fetch(`/api/certifications/${id}`, {
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

  //crear certificación
  create: async (
    certification: CertificationPost
  ): Promise<Certification | null> => {
    try {
      const response = await fetch("/api/certifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certification),
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

  //actualizar certificación
  update: async (
    certification: Certification
  ): Promise<Certification | null> => {
    try {
      const response = await fetch(`/api/certifications/${certification.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certification),
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

  //eliminar certificación
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/certifications/${id}`, {
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
};

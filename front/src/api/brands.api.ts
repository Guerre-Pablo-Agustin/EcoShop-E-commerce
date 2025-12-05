import { Brand, CreateBrandDto } from "@/types/Brand.types";

export const brandsApi = {
  //obtener todas las marcas
  getAll: async () => {
    try {
      const response = await fetch("/api/brands", {
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

  //obtener una marca por id
  getById: async (id: number): Promise<Brand | null> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
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

  //crear marca
  create: async (brand: CreateBrandDto): Promise<Brand | null> => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
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

  //actualizar marca
  update: async (brand: Brand): Promise<Brand | null> => {
    try {
      const response = await fetch(`/api/brands/${brand.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brand),
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

  //eliminar marca
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/brands/${id}`, {
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

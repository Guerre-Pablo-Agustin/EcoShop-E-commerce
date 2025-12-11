import { Product } from "@/types/Product.types";
import { API_BASE_URL } from "./config";


export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  brandId: number;
  categoryId: number;
  environmentalData: {
    carbonFootprint: number;
    material: string;
    countryOfOrigin: string;
    energyConsumption: number;
    recyclablePercentage: number;
    notes?: string;
  };
  certificationIds: number[];
}

export interface UpdateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  brandId: number;
  categoryId: number;
  environmentalData: {
    carbonFootprint: number;
    material: string;
    countryOfOrigin: string;
    energyConsumption: number;
    recyclablePercentage: number;
    notes?: string;
  },
  certificationIds: number[];
}

export const productApi = {
  // Obtener producto por ID (GET)
  getById: async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
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

  // Actualizar producto (PUT)
  update: async (
    id: number,
    product: UpdateProductDto
  ): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
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

  // Eliminar producto (DELETE)
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
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

  // Obtener todos los productos (GET)
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
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
      return [];
    }
  },

  // Crear producto (POST)
  create: async (product: CreateProductDto): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
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

  // Obtener productos por marca (GET)
  getByBrand: async (brandId: number): Promise<Product[]> => {
    try {
      const response = await fetch(`/api/products/brand/${brandId}`, {
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
      return [];
    }
  },
};

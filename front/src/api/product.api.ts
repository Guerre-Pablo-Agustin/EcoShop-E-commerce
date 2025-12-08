import { Product } from "@/types/Product.types";

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  impact: {
    carbonFootprint: number;
    recyclable: number;
    waterUsage: number;
    transportDistance: number;
  };
  stock: number;
  brandId: number;
  certifications: string[];
  materials: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  origin: {
    text: string;
  };
  rating: number;
  reviews: number;
  isActive: boolean;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}

export const productApi = {
  // Obtener producto por ID (GET)
  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
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
    id: string,
    product: UpdateProductDto
  ): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
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
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/products/${id}`, {
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
      const response = await fetch("/api/products", {
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
      const response = await fetch("/api/products", {
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

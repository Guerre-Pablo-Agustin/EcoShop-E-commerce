import { API_BASE_URL } from "./config";

// Tipos basados en el Swagger
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: "CUSTOMER" | "BRAND_ADMIN";
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Customer {
  id: number;
  user: User;
  shippingAddress: string;
  carbonFootprint: number;
}

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort[];
  unpaged: boolean;
}

export interface CustomerPageResponse {
  totalElements: number;
  totalPages: number;
  pageable: Pageable;
  size: number;
  content: Customer[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CustomerQueryParams {
  page?: number;
  size?: number;
  sort?: string;
}

export const customerAPI = {
  // Obtener todos los customers con paginación
  getAll: async (
    params?: CustomerQueryParams
  ): Promise<CustomerPageResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append("size", params.size.toString());
    }
    if (params?.sort) {
      queryParams.append("sort", params.sort);
    }

    const url = `/api/customers${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    
    console.log("🔍 URL:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📡 Response status:", response.status);
    console.log("📡 Response headers:", response.headers);
    
    // ✅ AGREGADO: Ver qué tipo de contenido está devolviendo
    const contentType = response.headers.get("content-type");
    console.log("📄 Content-Type:", contentType);
    
    // ✅ AGREGADO: Obtener el texto crudo primero
    const textResponse = await response.text();
    console.log("📝 Raw response:", textResponse.substring(0, 500)); // Primeros 500 caracteres
    
    if (!response.ok) {
      throw new Error("Error al obtener customers");
    }

    // ✅ Intentar parsear el texto como JSON
    try {
      return JSON.parse(textResponse);
    } catch (error) {
      console.error("❌ No se pudo parsear como JSON:", error);
      throw new Error("La respuesta no es JSON válido");
    }
  },

  // Obtener un customer por ID
  getById: async (id: number): Promise<Customer> => {
    const response = await fetch(`/api/customers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener customer");
    }

    return response.json();
  },

  // Obtener un customer por email
  getByEmail: async (email: string): Promise<Customer> => {
    const response = await fetch(
      `/api/customers/by-email?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al obtener customer por email");
    }

    return response.json();
  },
};

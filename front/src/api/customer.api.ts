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

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener customers");
    }

    return response.json();
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
      throw new Error("Error al obtener customer");
    }

    return response.json();
  },

  // ✅ OPTIMIZADO: Obtener un customer por email con manejo de errores mejorado
  getByEmail: async (email: string): Promise<Customer | null> => {
    try {
      const response = await fetch(
        `/api/customers/by-email?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Si el email no existe (404), devolver null SIN intentar parsear JSON
      if (response.status === 404) {
        return null;
      }

      // ✅ Para otros errores, lanzar excepción
      if (!response.ok) {
        throw new Error(`Error al verificar email: ${response.status}`);
      }

      // ✅ Verificar que la respuesta sea JSON antes de parsear
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.warn("La respuesta no es JSON, content-type:", contentType);
        return null;
      }

      // ✅ Verificar que haya contenido antes de parsear
      const text = await response.text();
      if (!text || text.trim() === "") {
        console.warn("La respuesta está vacía");
        return null;
      }

      // ✅ Solo parsear JSON si hay contenido
      return JSON.parse(text);
    } catch (error) {
      console.error("Error en getByEmail:", error);
      // Si es un error de red o parsing, devolver null
      if (error instanceof SyntaxError) {
        console.error("Error de parsing JSON:", error);
        return null;
      }
      throw error;
    }
  },

  // ✅ NUEVO: Método específico para verificar existencia de email
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      const customer = await customerAPI.getByEmail(email);
      // Si devuelve un customer, el email existe
      return customer !== null;
    } catch (error) {
      // Si hay un error de red u otro error, loguearlo y devolver false
      console.error("Error al verificar email:", error);
      throw error;
    }
  },
};

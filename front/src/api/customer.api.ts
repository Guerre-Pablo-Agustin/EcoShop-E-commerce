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
  phone: string;
}

export interface Customer {
  id: number;
  user: User;
  isActive: boolean;
  shippingAddress: string;
  carbonFootprint: number;
  billingAddress: string;
  phone: string;
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


export interface CustomerbyEmail {
billingAddress: string;
carbonFootprint: number;
createdAt: string;
email: string;
firstName: string;
id: number;
isActive: boolean;
lastName: string;
password: string;
phone: string;
shippingAddress: string;
updatedAt: string;
userType: "CUSTOMER" | "BRAND_ADMIN";
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
  getByEmail: async (email: string): Promise<CustomerbyEmail | null> => {
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

      // ✅ Si el email no existe (404 o 400), devolver null (email disponible)
      if (response.status === 404 || response.status === 400) {
        console.log(
          `Email no encontrado (${response.status}) - Email disponible`
        );
        return null;
      }

      // ✅ Para otros errores HTTP, lanzar excepción con el código
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status} al verificar email`);
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

      // Si es un error de parsing JSON, devolver null
      if (error instanceof SyntaxError) {
        console.error("Error de parsing JSON:", error);
        return null;
      }

      // Re-lanzar el error para que lo maneje el store
      throw error;
    }
  },

  // ✅ MEJORADO: Método específico para verificar existencia de email
  checkEmailExists: async (email: string): Promise<boolean> => {
    try {
      // Validación básica antes de llamar a la API
      if (!email || email.trim() === "") {
        throw new Error("El email no puede estar vacío");
      }

      console.log("Verificando email:", email);
      const customer = await customerAPI.getByEmail(email);

      // Si devuelve un customer, el email YA existe (no disponible)
      // Si devuelve null, el email NO existe (disponible)
      const exists = customer !== null;
      console.log("Resultado verificación - Email existe:", exists);

      return exists;
    } catch (error: any) {
      console.error("Error al verificar email:", error);

      // Re-lanzar el error original sin modificarlo
      throw error;
    }
  },


   //editar customer
   updateCustomer: async (customerId: number, customer: CustomerbyEmail): Promise<CustomerbyEmail | null> => {
    try {
      const response = await fetch(
        `/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  },

};

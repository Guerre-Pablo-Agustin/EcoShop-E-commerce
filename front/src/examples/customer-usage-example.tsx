// EJEMPLO DE USO - customer.store.ts
// Este archivo es solo para referencia, puedes eliminarlo

import { useEffect, useState } from "react";
import { useCustomerStore } from "../store/customer.store";

// Ejemplo 1: Componente que lista todos los customers
export function CustomerListExample() {
  const { customers, pagination, isLoading, error, fetchCustomers } =
    useCustomerStore();

  // Cargar customers al montar el componente
  useEffect(() => {
    fetchCustomers({ page: 0, size: 10 });
  }, [fetchCustomers]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.user.firstName} {customer.user.lastName} -{" "}
            {customer.user.email}
            <br />
            Dirección: {customer.shippingAddress}
            <br />
            Huella de carbono: {customer.carbonFootprint}
          </li>
        ))}
      </ul>

      {pagination && (
        <div>
          Página {pagination.currentPage + 1} de {pagination.totalPages}
          <br />
          Total de elementos: {pagination.totalElements}
        </div>
      )}
    </div>
  );
}

// Ejemplo 2: Componente que muestra un customer específico
export function CustomerDetailExample({ customerId }: { customerId: number }) {
  const {
    currentCustomer,
    isLoading,
    error,
    fetchCustomerById,
    clearCurrentCustomer,
  } = useCustomerStore();

  useEffect(() => {
    fetchCustomerById(customerId);

    // Limpiar al desmontar
    return () => clearCurrentCustomer();
  }, [customerId, fetchCustomerById, clearCurrentCustomer]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentCustomer) return <div>No se encontró el customer</div>;

  return (
    <div>
      <h1>Detalle del Customer</h1>
      <p>
        Nombre: {currentCustomer.user.firstName} {currentCustomer.user.lastName}
      </p>
      <p>Email: {currentCustomer.user.email}</p>
      <p>Tipo: {currentCustomer.user.userType}</p>
      <p>Dirección de envío: {currentCustomer.shippingAddress}</p>
      <p>Huella de carbono: {currentCustomer.carbonFootprint}</p>
      <p>Activo: {currentCustomer.user.isActive ? "Sí" : "No"}</p>
    </div>
  );
}

// Ejemplo 3: Paginación
export function CustomerPaginationExample() {
  const { fetchCustomers, pagination } = useCustomerStore();
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchCustomers({ page: newPage, size: 10 });
  };

  return (
    <div>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={pagination?.first}
      >
        Anterior
      </button>

      <span>Página {currentPage + 1}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={pagination?.last}
      >
        Siguiente
      </button>
    </div>
  );
}

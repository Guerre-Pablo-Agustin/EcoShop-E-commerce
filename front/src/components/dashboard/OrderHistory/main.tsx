"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { useProductStore } from "@/store/product.store";
import { getColumns } from "./columns";
import { useOrderStore } from "@/store/order.store";
import { useAuthStore } from "@/store/auth.store";

const MainOrderHistory = () => {
  const { user } = useAuthStore();
  const { customerOrders, isLoading, fetchOrdersByCustomerId } =
    useOrderStore();
  console.log("user", user);

  useEffect(() => {
    if (user) {
      fetchOrdersByCustomerId(user?.id);
    }
  }, [fetchOrdersByCustomerId, user]);

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  console.log("customerOrders", customerOrders);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Historial de Pedidos</h1>
      <DataTable columns={getColumns()} data={customerOrders} />
    </div>
  );
};

export default MainOrderHistory;

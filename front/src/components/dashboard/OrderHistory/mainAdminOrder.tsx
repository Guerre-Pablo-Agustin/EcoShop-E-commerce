"use client";

import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { useOrderStore } from "@/store/order.store";

const MainAdminOrderHistory = () => {
  const { orders, isLoading, fetchOrders } =
    useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  console.log("orders", orders);

  

  return (
    <div>
      <DataTable columns={getColumns()} data={orders} />
    </div>
  );
};

export default MainAdminOrderHistory;
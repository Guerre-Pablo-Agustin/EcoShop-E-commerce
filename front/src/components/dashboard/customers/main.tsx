import { useCustomerStore } from "@/store/customer.store";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";

const MainCustomers = () => {
  const { customers, pagination, isLoading, error, fetchCustomers } =
    useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  if (isLoading)
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;


    console.log("customers", customers);

  return <div>
     <DataTable columns={getColumns()} data={customers!} />
  </div>;
};

export default MainCustomers;

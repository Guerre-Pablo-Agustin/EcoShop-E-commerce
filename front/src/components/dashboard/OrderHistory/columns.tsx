"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderDetails } from "./OrderDetails";
import { Link } from "react-router-dom";
import { List, MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { routes } from "@/lib/routes";
import { Product } from "@/types/Product.types";
import { Order } from "@/types/Order.types";

// Función para generar las columnas con las acciones
export const getColumns = (): ColumnDef<Order>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "orderNumber",
    header: "N° de Orden",
  },
  {
    accessorKey: "co2Saved",
    header: "CO2 Guardado",
  },
  {
    accessorKey: "ecoPointsEarned",
    header: "Puntos Eco",
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          ${product.totalAmount.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalCarbonFootprint",
    header: "total Carbon Footprint",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex justify-center items-center gap-2">
          {order.totalCarbonFootprint}
        </div>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Fecha",
    cell: ({ row }) => {
      const order = row.original;

      const date = new Date(order.orderDate);

      return (
        <div className="flex items-center gap-2">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(product.id))}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <OrderDetails order={product}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Ver mas detalles <List className="ml-1 h-4 w-4" />
              </DropdownMenuItem>
            </OrderDetails>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

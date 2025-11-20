"use client";

import { ColumnDef } from "@tanstack/react-table";

import { List, MoreHorizontal, ArrowUpDown, Leaf, Recycle } from "lucide-react";

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
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

// Función para generar las columnas con las acciones
export const getColumns = (): ColumnDef<Product>[] => [
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
    accessorKey: "name",
    header: "Producto",
  },
  {
    accessorKey: "category",
    header: "categoria",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          ${product.price.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const product = row.original;

      const statusColor = (status: boolean) => {
        return status ? "bg-green-500" : "bg-red-500";
      };

      return (
        <div className="flex items-center gap-2">
          <div className="w-32">
            <Badge
              variant="outline"
              className={`text-white px-1.5 ${statusColor(product.isActive)}`}
            >
              {product.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "impact",
    header: "Impacto Ambiental",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-600">
            <Leaf className="h-4 w-4 inline-block mr-1" />
            {product.impact.recyclable}%
          </div>
          <div className="flex items-center text-gray-600">
            <div className="text-sm">CO₂</div>
            {product.impact.carbonFootprint}%
          </div>
          <div className="flex items-center">
            <Recycle className="h-4 w-4 text-blue-600 inline-block mr-1" />
            {product.impact.waterUsage}%
          </div>
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
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to={`/dashboard/product/${product.id}/edit`}>
              <DropdownMenuItem>
                Editar <List className="ml-1 h-4 w-4" />
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

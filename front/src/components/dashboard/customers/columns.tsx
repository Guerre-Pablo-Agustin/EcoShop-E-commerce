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
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { Customer } from "@/api/customer.api";

// Función para generar las columnas con las acciones
export const getColumns = (): ColumnDef<Customer>[] => [
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
    accessorKey: "user.firstName",
    header: "Nombre",
  },
  {
    accessorKey: "user.lastName",
    header: "Apellido",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "user.updatedAt",
    header: "ultima actualizacion",
    cell: ({ row }) => {
      {/*formato de fecha */}
      const fecha = row.original.user.updatedAt;
      return new Date(fecha).toLocaleDateString();
    },
  },
  {
    accessorKey: "user.isActive",
    header: "Activo",
    cell: ({ row }) => {
      const isActive = row.original.user.isActive;
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "carbonFootprint",
    header: "Carbon Footprint",
    cell: ({ row }) => {
      const carbonFootprint = row.original.carbonFootprint;
      return (
        <Badge variant="default" className="text-center">{!carbonFootprint ? "0" : carbonFootprint}</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const marca = row.original;

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
              onClick={() => navigator.clipboard.writeText(marca.id.toString())}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              to={routes.dashboardMarcasEditar.replace(
                ":id",
                marca.id.toString()
              )}
            >
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

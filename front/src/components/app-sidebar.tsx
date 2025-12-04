"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Archive,
  Leaf,
  BarChart3,
  Users,
  ShoppingBag,
  User2,
  Heart,
  type LucideIcon,
  List,
} from "lucide-react";
import logoImage from "../assets/EcoShop_Logo.svg";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";
import { useAuthStore } from "@/store/auth.store";

// 1️⃣ Definir tipos para mejor type safety
type NavItem = {
  title: string;
  icon: LucideIcon;
  url: string;
  isActive: boolean;
};

// 2️⃣ Configuración de navegación por tipo de usuario
const NAVIGATION_CONFIG: Record<"CUSTOMER" | "BRAND_ADMIN", NavItem[]> = {
  CUSTOMER: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: routes.dashboard,
      isActive: true,
    },
    {
      title: "Perfil",
      icon: User2,
      url: "#",
      isActive: false,
    },
    {
      title: "Favoritos",
      icon: Heart,
      url: "#",
      isActive: false,
    },
    {
      title: "Historial de compras",
      icon: List,
      url: "#",
      isActive: false,
    },
    {
      title: "Carrito",
      icon: ShoppingCart,
      url: "#",
      isActive: false,
    },
  ],
  BRAND_ADMIN: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: routes.dashboard,
      isActive: true,
    },
    {
      title: "Ventas",
      icon: ShoppingCart,
      url: routes.dashboardVentas,
      isActive: false,
    },
    {
      title: "Productos",
      icon: Package,
      url: routes.dashboardProducts,
      isActive: false,
    },
    {
      title: "Inventario",
      icon: Archive,
      url: routes.dashboardInventario,
      isActive: false,
    },
    {
      title: "Impacto Ambiental",
      icon: Leaf,
      url: routes.dashboardImpacto,
      isActive: false,
    },
    {
      title: "Reportes",
      icon: BarChart3,
      url: routes.dashboardReportes,
      isActive: false,
    },
    {
      title: "Clientes",
      icon: Users,
      url: routes.dashboardClientes,
      isActive: false,
    },
    {
      title: "Marcas",
      icon: ShoppingBag,
      url: routes.dashboardMarcas,
      isActive: false,
    },
  ],
};

// 3️⃣ Hook personalizado para obtener la navegación
function useNavigation() {
  const { user } = useAuthStore();

  const userType = user?.userType as "CUSTOMER" | "BRAND_ADMIN" | undefined;

  // Por defecto mostrar navegación de CUSTOMER si no hay usuario
  return NAVIGATION_CONFIG[userType || "CUSTOMER"];
}

export default function EcoShopSidebar() {
  const { user } = useAuthStore();
  const navigationItems = useNavigation();

  // 4️⃣ Memoizar el objeto de usuario para evitar re-renders innecesarios
  const userLogin = React.useMemo(
    () => ({
      firstName: user?.firstName || "Usuario",
      lastName: user?.lastName || "Invitado",
      email: user?.email || "invitado@ecoshop.com",
      avatar: "/avatars/shadcn.jpg",
    }),
    [user]
  );

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={routes.dashboard}>
                <img
                  src={logoImage}
                  alt="EcoShop Logo"
                  className="w-36 h-22 object-contain"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser userLogin={userLogin} />
      </SidebarFooter>
    </Sidebar>
  );
}

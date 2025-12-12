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
  StickyNote,
} from "lucide-react";
import logoImage from "../assets/EcoShop_Logo.svg";
import logoDarkImage from "../assets/Logo_Dark.png";
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
import { useTheme } from "@/components/theme/theme-provider";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

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
      url: routes.dashboardUsersProfile,
      isActive: false,
    },
    {
      title: "Historial de compras",
      icon: List,
      url: routes.dashboardOrdersHistory,
      isActive: false,
    },
    {
      title: "Carrito",
      icon: ShoppingCart,
      url: routes.shoppingCart,
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
    {
      title: "Categorias",
      icon: List,
      url: routes.dashboardCategorias,
      isActive: false,
    },
    {
      title: "Certificaciones",
      icon: StickyNote,
      url: routes.dashboardCertifications,
      isActive: false,
    }
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
  const { theme } = useTheme();
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

  // 5️⃣ Determinar qué logo mostrar según el tema
  const { currentLogo, logoSize } = React.useMemo(() => {
    let isDark = false;
    
    // Si el tema es 'system', detectar el tema del sistema
    if (theme === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } else {
      isDark = theme === "dark";
    }
    
    return {
      currentLogo: isDark ? logoDarkImage : logoImage,
      logoSize: isDark ? "h-36" : "h-28" 
    };
  }, [theme]);

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={routes.dashboard} className="flex items-center justify-center">
                <img
                  src={currentLogo}
                  alt="EcoShop Logo"
                  className={`${logoSize} w-auto object-contain`}
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
        <Link to={routes.store}>
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="mr-2 h-4 w-4" />
            ir a la Tienda
          </Button>
        </Link>
        <NavUser userLogin={userLogin} />
      </SidebarFooter>
    </Sidebar>
  );
}
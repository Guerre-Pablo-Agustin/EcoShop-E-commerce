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
  Command,
} from "lucide-react";
import logoImage from "../assets/EcoShop_Logo.svg";
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { routes } from "@/lib/routes";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: routes.dashboard,
    active: true,
  },
  {
    title: "Ventas",
    icon: ShoppingCart,
    url: routes.dashboardVentas,
    active: false,
  },
  {
    title: "Productos",
    icon: Package,
    url: routes.dashboardProducts,
    active: false,
  },
  {
    title: "Inventario",
    icon: Archive,
    url: routes.dashboardInventario,
    active: false,
  },
  {
    title: "Impacto Ambiental",
    icon: Leaf,
    url: routes.dashboardImpacto,
    active: false,
  },
  {
    title: "Reportes",
    icon: BarChart3,
    url: routes.dashboardReportes,
    active: false,
  },
  {
    title: "Clientes",
    icon: Users,
    url: routes.dashboardClientes,
    active: false,
  },
];

const user = {
      name:  "test",
      email:  "example@example.com",
      avatar: "/avatars/shadcn.jpg",
};

export default function EcoShopSidebar() {
  const [activeItem, setActiveItem] = React.useState("Dashboard");

  return (
   <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
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
        {/* {data.projects.length > 0 && 
        <NavProjects projects={data.projects} name="Planes" />}
        {data.bussines.length > 0 && 
        <NavProjects projects={data.bussines} name="Negocios"/>}
        {data.navSecondary.length > 0 && (
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        )} */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

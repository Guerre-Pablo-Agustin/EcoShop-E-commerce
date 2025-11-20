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

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "#",
    active: true,
  },
  {
    title: "Ventas",
    icon: ShoppingCart,
    url: "#",
    active: false,
  },
  {
    title: "Productos",
    icon: Package,
    url: "#",
    active: false,
  },
  {
    title: "Inventario",
    icon: Archive,
    url: "#",
    active: false,
  },
  {
    title: "Impacto Ambiental",
    icon: Leaf,
    url: "#",
    active: false,
  },
  {
    title: "Reportes",
    icon: BarChart3,
    url: "#",
    active: false,
  },
  {
    title: "Clientes",
    icon: Users,
    url: "#",
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
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ArgTech</span>
                  <span className="truncate text-xs">Devs</span>
                </div>
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

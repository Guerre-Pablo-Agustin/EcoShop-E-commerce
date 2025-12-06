"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/auth.store"
import { useNavigate } from "react-router-dom"
// import { useRouter } from "next/navigation"
// import { useDispatch } from "react-redux"
// import { useLogoutMutation } from "@/redux/services/authApi"
// import { logoutUser } from "@/redux/features/userSlice"

export function NavUser({
  userLogin,
}: {
  userLogin: {
    firstName: string
    lastName: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

 const navigate = useNavigate();

  const {logout} = useAuthStore()

  //  const routes = useRouter();
  // const dispatch = useDispatch();
  // const [logout] = useLogoutMutation();

  // const Handlerlogout = async () => {
  //   try {
  //     const response = await logout();
  //     if (response?.data) {
  //       dispatch(logoutUser());
  //       routes.push("/login");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //   }
  // };

console.log("userLogin", userLogin)

const handlerLogout = () => {
  logout()
  navigate("/login")
}


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userLogin.avatar} alt={userLogin.firstName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userLogin.firstName}</span>
                <span className="truncate font-medium">{userLogin.lastName}</span>
                <span className="truncate text-xs">{userLogin.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-sidebar dark:bg-sidebar dark:text-sidebar-foreground"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userLogin.avatar} alt={userLogin.firstName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userLogin.firstName}</span>
                  <span className="truncate font-medium">{userLogin.lastName}</span>
                  <span className="truncate text-xs">{userLogin.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlerLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

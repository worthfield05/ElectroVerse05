import { cn } from "@/lib/utils";
import { Home, LogIn, LogOut, Package, ShoppingBag, User } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";

import { useProfile } from "@/hooks/useAuth";

const AppSidebar = () => {
  const { data: user } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: ShoppingBag },
    { name: "Orders", path: "/orders", icon: Package },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <Sidebar side="right">
      <SidebarHeader className={"font-bo"}>ElectroVerse</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>ElectroVerse</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={`${item.path}`}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={"border-t"}>
        {user ? (
          <SidebarMenuButton>
            <LogOut className="w-5 h-5" />
            Logout
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton onClick={() => navigate("/login")}>
            <LogIn className="w-5 h-5" />
            Login
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

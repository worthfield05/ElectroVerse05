import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Link } from "react-router";

const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "All Products",
          url: "products",
        },
        {
          title: "Create Product",
          url: "product/new",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      items: [
        {
          title: "All Users",
          url: "users",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      items: [
        {
          title: "All Orders",
          url: "orders",
        },
      ],
    },
    {
      title: "Reviews",
      url: "#",
      items: [
        {
          title: "All Reviews",
          url: "reviews",
        },
      ],
    },
  ],
};

const AdminAppSidebar = ({ ...props }) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"/"}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center rounded-lg">
                  <img src="/logo.png" />
                  <span className="ml-2 text-black  font-semibold">
                    ElectroVerse
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminAppSidebar;

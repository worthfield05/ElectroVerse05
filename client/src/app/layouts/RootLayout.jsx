import AppSidebar from "@/components/common/AppSidebar";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className="relative w-full min-h-screen">
        {/* Mobile drawer sidebar */}
        <div className="md:hidden">
          <AppSidebar />
        </div>

        {/* Main layout */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default RootLayout;

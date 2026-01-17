import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { Link, Outlet } from "react-router";

const CheckoutLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to={"/"}
            className="   flex items-center gap-2 font-semibold text-lg"
          >
            <Avatar>
              <AvatarImage src="/logo.png" />
            </Avatar>
            <span>ElectroVerse</span>
          </Link>
          <div className="text-sm text-neutral-500">Secure Checkout</div>
        </div>
      </header>
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <Outlet />
        <p className="text-center mt-6 text-gray-400 uppercase tracking-widest text-[10px]">
          100% Secure Checkout Experience
        </p>
      </main>
    </div>
  );
};

export default CheckoutLayout;

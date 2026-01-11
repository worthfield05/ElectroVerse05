import React from "react";
import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex px-6 bg-red-300 justify-between">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>product</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/products/5"}>Detail</Link>
      </div>
      <div>
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default RootLayout;

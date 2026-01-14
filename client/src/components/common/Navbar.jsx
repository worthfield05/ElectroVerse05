import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarImage } from "../ui/avatar";

import { ShoppingCart, User } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import SearchBar from "./SearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { useLogout, useProfile } from "@/hooks/useAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { data: user } = useProfile();
  const { mutate: logout } = useLogout();
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Profile", path: "/profile" },
  ];
  const cartCount = 3;
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",

          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b shadow-sm"
            : "bg-white border-b"
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-lg hover:opacity-70 transition-opacity"
            >
              <Avatar>
                <AvatarImage src="/logo.png" />
              </Avatar>
              <span className="hidden sm:inline">ElectroVerse</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-neutral-600",
                    location.pathname === link.path
                      ? "text-neutral-900"
                      : "text-neutral-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <SearchBar />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className={"hover:bg-neutral-600 cursor-pointer"}>
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"w-56"}>
                  <DropdownMenuLabel className="p-1 font-semibold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {user ? (
                      <>
                        <DropdownMenuItem>
                          <Link to={"/profile"} className="w-full">
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={"/orders"} className="w-full">
                            Order
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                          Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem>
                          <Link to={"/login"} className="w-full">
                            Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={"/register"} className="w-full">
                            Register
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Link
                to={"/profile"}
                className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </Link> */}
              <Link className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <SidebarTrigger className={"md:hidden w-5 h-5"} />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;

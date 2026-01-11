import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Avatar>
              <AvatarImage src="/logo.png" />
            </Avatar>
          </div>
          ElectroVerse
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

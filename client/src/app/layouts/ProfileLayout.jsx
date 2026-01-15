import { cn } from "@/lib/utils";
import {
  Bell,
  CreditCard,
  Key,
  LayoutDashboardIcon,
  MapPin,
  User,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";

const tabs = [
  { icon: LayoutDashboardIcon, label: "Dashboard", url: "/profile" },
  { icon: User, label: "Edit Profile", url: "edit" },
  { icon: Key, label: "Change Password", url: "password-update" },
  { icon: CreditCard, label: "Payment", url: "/payment" },
  { icon: Bell, label: "Notifications", url: "/notifications" },
];

const ProfileLayout = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border p-4">
            {tabs.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.url}
                  end
                  className={({ isActive }) =>
                    cn(
                      "w-full flex rounded-lg cursor-pointer items-center px-4 py-3 gap-3 ",
                      isActive ? "bg-neutral-100" : "hover:bg-neutral-50"
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
          <div className="md:col-span-3 bg-white rounded-lg border p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;

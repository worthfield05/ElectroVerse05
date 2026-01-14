import { Bell, CreditCard, MapPin, User } from "lucide-react";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border p-4">
            {[
              { icon: User, label: "Account" },
              { icon: MapPin, label: "Addresses" },
              { icon: CreditCard, label: "Payment" },
              { icon: Bell, label: "Notifications" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="md:col-span-3 bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <button className="bg-neutral-900 text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

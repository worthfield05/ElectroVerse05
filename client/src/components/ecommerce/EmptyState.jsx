import { Heart, Package, Search, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

const EmptyState = ({ type = "cart" }) => {
  const states = {
    cart: {
      icon: ShoppingCart,
      title: "Your cart is empty",
      description: "Add items to your cart to get started",
      action: {
        label: "Continue Shopping",
        to: "/products",
      },
    },
    orders: {
      icon: Package,
      title: "No orders yet",
      description:
        "You haven't placed any orders yet. Start shopping to see your orders here.",
      action: {
        label: "Start Shopping",
        to: "/products",
      },
    },
    wishlist: {
      icon: Heart,
      title: "Your wishlist is empty",
      description: "Save items you loved to your wishlist",
      action: {
        label: "Explore Products",
        to: "/products",
      },
    },
    search: {
      icon: Search,
      title: "No results found",
      description:
        "Try adjusting your search or filters to find what you're looking for",
      action: {
        label: "Clear Filters",
        to: "/products",
      },
    },
  };
  const state = states[type] || states.cart;
  const Icon = state.icon;
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-neutral-400" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{state.title}</h2>
      <p className="text-neutral-600 mb-8 max-w-md">{state.description}</p>
      <Link to={state.action.to}>
        <Button size="lg">{state.action.label}</Button>
      </Link>
    </div>
  );
};

export default EmptyState;

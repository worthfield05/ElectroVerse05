import { Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const CartSummary = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return (
    <div className="bg-neutral-50 rounded-lg p-6 space-y-4 sticky top-20">
      <h3 className="font-semibold text-lg">Order Summary</h3>
      <div className="space-y-3 py-4 border-y">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Subtotal</span>
          <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Tax</span>
          <span className="font-medium">Rs. {tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>Rs. {total.toFixed(2)}</span>
      </div>
      <Link
        to={"/checkout"}
        className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 flex items-center justify-center gap-2"
      >
        <Lock className="w-4 h-4" />
        Checkout
      </Link>
    </div>
  );
};

export default CartSummary;

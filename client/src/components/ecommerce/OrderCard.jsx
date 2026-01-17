import { CheckCircle, Package, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const OrderCard = ({ order }) => {
  console.log(order);
  const statusConfig = {
    Processing: {
      icon: Package,
      color: "bg-yellow-100 text-yellow-800",
      label: "Processing",
    },
    Shipped: {
      icon: Truck,
      color: "bg-blue-100 text-blue-800",
      label: "Shipped",
    },
    Delivered: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
      label: "Delivered",
    },
  };
  const status = statusConfig[order.orderStatus];
  const StatusIcon = status.icon;
  return (
    <div className="bg-white rounded-lg border p-6 hover:border-neutral-300 transition-colors">
      <div className="flex justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold">Order #{order._id}</h3>
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold ${status.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <div className="font-semibold">Rs. {order.totalPrice}</div>
          <div className="text-sm text-neutral-500">
            {order.orderItems.length} items
          </div>
        </div>
      </div>
      {order.trackingNumber && (
        <div className="bg-neutral-50 rounded-lg p-3 mb-4 text-sm">
          <span className="text-neutral-600">Tracking: </span>
          <code className="font-mono">{order.trackingNumber}</code>
        </div>
      )}
      <div className="flex gap-2">
        <Link
          to={`${order._id}`}
          className="flex-1 text-center border rounded-lg py-2 text-sm font-medium hover:bg-neutral-50"
        >
          View Details
        </Link>
        {order.status === "Delivered" && (
          <button className="flex-1 bg-neutral-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-neutral-800">
            Buy Again
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;

import OrderCard from "@/components/ecommerce/OrderCard";
import React from "react";

const Orders = () => {
  const orders = [
    {
      id: "ORD-10001",
      status: "delivered",
      date: "2026-01-05",
      total: 487,
      items: 2,
      trackingNumber: "TRK123456",
    },
    {
      id: "ORD-10002",
      status: "shipped",
      date: "2026-01-08",
      total: 299,
      items: 1,
      trackingNumber: "TRK789012",
    },
    {
      id: "ORD-10003",
      status: "processing",
      date: "2026-01-10",
      total: 156,
      items: 3,
    },
  ];
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;

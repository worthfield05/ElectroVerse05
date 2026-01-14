import CartItem from "@/components/ecommerce/CartItem";
import CartSummary from "@/components/ecommerce/CartSummary";
import React, { useState } from "react";

const Cart = () => {
  const mockProduct = {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 234,
    category: "electronics",
    inStock: true,
    badge: "Sale",
  };

  const mockCartItems = [
    { ...mockProduct, quantity: 2, stock: 10 },
    {
      id: "2",
      name: "Modern Desk Lamp",
      price: 89,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      quantity: 1,
      stock: 5,
    },
  ];
  const [items, setItems] = useState(mockCartItems);
  const updateQuantity = (id, newQty) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="container mx-auto mt-4 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">
          Shopping Cart ({items.length} items)
        </h2>
        <div className="bg-white rounded-lg border p-6">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>
      <div>
        <CartSummary items={items} />
      </div>
    </div>
  );
};

export default Cart;

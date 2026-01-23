import PageTitle from "@/components/common/PageTitle";
import CartItem from "@/components/ecommerce/CartItem";
import CartSummary from "@/components/ecommerce/CartSummary";
import EmptyState from "@/components/ecommerce/EmptyState";
import { ProductGridSkeleton } from "@/components/ecommerce/Skeletons";
import { getCart, setCart } from "@/hooks/useCart";
import { useCartItem } from "@/hooks/useCartItem";
import React, { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const cartQueries = useCartItem();
  const cartItems = getCart();
  const [update, setUpdate] = useState(0);

  const cartSummaryItems = cartQueries
    .map((query, index) => {
      if (!query.data) return null;
      return {
        price: query.data.product.price,
        quantity: cartItems[index].quantity,
        productId: query.data.product._id,
        inStock: query.data.product.stock,
      };
    })
    .filter(Boolean);

  const removeItem = (id) => {
    const filteredItem = cartItems.filter((item) => item.productId !== id);
    setCart(filteredItem);
    setUpdate((prev) => prev + 1);
  };
  const updateQuantity = (productId, quantity) => {
    const cart = cartItems.map((item) => {
      if (item.productId !== productId) return item;
      const checkStock = cartSummaryItems.find(
        (data) => item.productId === data.productId,
      );
      if (quantity > checkStock.inStock) {
        toast.error("Quantity cannot exceed product stock");
        return item;
      }

      return { ...item, quantity };
    });
    setCart(cart);
    setUpdate((pre) => pre + 1);
  };

  if (cartQueries.length < 1) {
    return <EmptyState />;
  }

  return (
    <>
      <PageTitle title={"Cart"} />
      <div className="container mx-auto mt-4 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">
            Shopping Cart ({cartQueries?.length} items)
          </h2>
          <div className="bg-white rounded-lg border p-6">
            {cartQueries.map((query, index) => {
              if (query.isLoading)
                return <ProductGridSkeleton key={index} count={3} />;
              const product = query?.data?.product;
              const quantity = cartItems[index].quantity;
              return (
                <CartItem
                  key={product._id}
                  item={product}
                  quantity={quantity}
                  onUpdate={updateQuantity}
                  onRemove={removeItem}
                />
              );
            })}
          </div>
        </div>
        <div>
          <CartSummary items={cartSummaryItems} />
        </div>
      </div>
    </>
  );
};

export default Cart;

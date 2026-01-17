import { useQueries } from "@tanstack/react-query";
import { getCart, setCart } from "./useCart";
import { getProductDetail } from "@/apis/product.api";

export const addToCart = (productId, quantity) => {
  const cart = getCart();
  const existingCart = cart.find((item) => item.productId === productId);
  if (existingCart) {
    existingCart.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  setCart(cart);
};
export const useCartItem = () => {
  const cartItems = getCart();
  return useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.productId],
      queryFn: () => getProductDetail(item.productId),
      staleTime: 1000 * 60 * 5,
    })),
  });
};

const CART_KEY = "cart";
const SHIPPING_KEY = "shipping";
export const setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cart-change"));
};
export const setShippingAddress = (address) => {
  localStorage.setItem(SHIPPING_KEY, JSON.stringify(address));
};
export const getShippingAddress = () => {
  return JSON.parse(localStorage.getItem(SHIPPING_KEY)) || [];
};

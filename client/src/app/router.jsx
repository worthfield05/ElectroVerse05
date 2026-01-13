import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import {
  Cart,
  Checkout,
  Home,
  Login,
  NotFound,
  Orders,
  ProductDetail,
  Products,
  Profile,
  Register,
} from "./pages";
import { AuthLayout, CheckoutLayout, RootLayout } from "./layouts";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/checkout" element={<CheckoutLayout />}>
        <Route index element={<Checkout />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

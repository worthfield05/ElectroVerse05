import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "./layouts/RootLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

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

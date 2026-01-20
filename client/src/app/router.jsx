import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import {
  Cart,
  ChangePassword,
  Checkout,
  EditProfile,
  Home,
  Login,
  MyOrder,
  NotFound,
  Orders,
  ProductDetail,
  Products,
  Profile,
  Register,
} from "./pages";
import {
  AuthLayout,
  CheckoutLayout,
  ProfileLayout,
  ProtectedLayout,
  RootLayout,
} from "./layouts";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderLayout from "./layouts/OrderLayout";
import OrderDetail from "./pages/OrderDetail";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/admin/ProductList";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import UserList from "./pages/admin/UserList";
import UpdateUser from "./pages/admin/UpdateUser";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<ProtectedLayout />}>
          <Route element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<OrderLayout />}>
              <Route index element={<Orders />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="password-update" element={<ChangePassword />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Route>
      <Route path="/checkout" element={<ProtectedLayout />}>
        <Route element={<CheckoutLayout />}>
          <Route index element={<Checkout />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product/new" element={<CreateProduct />} />
        <Route path="product/:id" element={<UpdateProduct />} />
        <Route path="users" element={<UserList />} />
        <Route path="user/:id" element={<UpdateUser />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

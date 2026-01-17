import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getMyOrder,
  getSingleOrder,
  removeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/new/order").post(isAuthenticated, createOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateOrderStatus)
  .delete(isAuthenticated, isAuthorized("admin"), removeOrder);

router
  .route("/admin/orders")
  .get(isAuthenticated, isAuthorized("admin"), getAllOrder);
router.route("/orders/user").get(isAuthenticated, getMyOrder);
export default router;

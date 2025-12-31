import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/products")
  .get(isAuthenticated, getAllProducts)
  .post(isAuthenticated, isAuthorized("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), removeProduct)
  .get(isAuthenticated, getSingleProduct);
export default router;

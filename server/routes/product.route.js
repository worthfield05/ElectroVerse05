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
router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .post(isAuthenticated, isAuthorized("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), removeProduct);
router.route("/product/:id").get(getSingleProduct);
export default router;

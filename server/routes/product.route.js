import { Router } from "express";
import {
  createProduct,
  createProductReview,
  getAllProducts,
  getProductList,
  getProductReviews,
  getSingleProduct,
  removeProduct,
  removeReview,
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
  .get(isAuthenticated, isAuthorized("admin"), getProductList)
  .post(isAuthenticated, isAuthorized("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, isAuthorized("admin"), updateProduct)
  .delete(isAuthenticated, isAuthorized("admin"), removeProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticated, createProductReview);
router.route("/reviews").get(getProductReviews).delete(removeReview);
export default router;

import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();
router
  .route("/products")
  .get(isAuthenticated, getAllProducts)
  .post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(removeProduct)
  .get(getSingleProduct);
export default router;

import { Router } from "express";
import {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/update-password").put(isAuthenticated, updatePassword);
router.route("/update-user").put(isAuthenticated, updateUser);
export default router;

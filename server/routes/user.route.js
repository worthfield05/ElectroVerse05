import { Router } from "express";
import {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
export default router;

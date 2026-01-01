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
  getUserLists,
  getSingleUser,
  updateUserRole,
  removeUser,
} from "../controllers/user.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/update-password").put(isAuthenticated, updatePassword);
router.route("/update-user").put(isAuthenticated, updateUser);
router
  .route("/admin/users")
  .get(isAuthenticated, isAuthorized("admin"), getUserLists);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, isAuthorized("admin"), getSingleUser)
  .put(isAuthenticated, isAuthorized("admin"), updateUserRole)
  .delete(isAuthenticated, isAuthorized("admin"), removeUser);

export default router;

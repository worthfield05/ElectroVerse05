import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ApiError(401, "Authenticate to access this resource"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not allowed to access this resources")
      );
    }
    next();
  };
};

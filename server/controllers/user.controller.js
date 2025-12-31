import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { setToken } from "../utils/token.js";
import crypto from "node:crypto";

export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: "this is temp",
      url: "this is public url",
    },
  });
  await user.save();
  return setToken(201, "User created Successfully", user, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const verifyEmail = await User.findOne({ email }).select("+password");
  if (!verifyEmail) {
    return next(new ApiError(400, "Invalid email"));
  }
  const comPass = await verifyEmail.comparePassword(password);
  if (!comPass) {
    return next(new ApiError(400, "Invalid password"));
  }
  return setToken(200, "Login Successfully", verifyEmail, res);
});

export const logout = catchAsync((req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logout Successfully",
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  let resetToken;
  try {
    resetToken = await user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(
      new ApiError(400, "Could not save reset token, please try again later")
    );
  }
  const url = `http://localhost/api/v1/reset-password/${resetToken}`;
  const message = `please click link below to send password reset request ${url}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ApiError(400, "Could not save reset token, please try again later")
    );
  }
});
export const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError(400, "Expire or invalid password token"));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  return setToken(200, "Password Reset Successfully", user, res);
});

import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { setToken } from "../utils/token.js";
import crypto from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validate file
  if (!req.files || !req.files.avatar) {
    return next(new ApiError(400, "Avatar file is required"));
  }

  const avatar = req.files.avatar;
  const myCloud = await cloudinary.uploader.upload(avatar.tempFilePath, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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

export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });
  return res.status(200).json({
    success: true,
    message: "User details",
    user,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: req.user.id }).select("+password");
  const checkPassword = await user.comparePassword(oldPassword);
  if (!checkPassword) {
    return next(new ApiError(400, "Old password is incorrect"));
  }
  user.password = newPassword;
  await user.save();
  return setToken(200, "Password Updated Successfully", user, res);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { email, name } = req.body;
  const updatedData = {
    email,
    name,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

//admin
export const getUserLists = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ApiError(404, "Users not found"));
  }
  return res.status(200).json({
    success: true,
    message: "All users found",
    users,
  });
});

export const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    user,
  });
});

export const updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  const newData = {
    role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  return res.status(200).json({
    success: true,
    message: "User role successfully changed",
    user,
  });
});

export const removeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "User remove successfully",
  });
});

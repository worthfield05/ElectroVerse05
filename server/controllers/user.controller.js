import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";
import { setToken } from "../utils/token.js";

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

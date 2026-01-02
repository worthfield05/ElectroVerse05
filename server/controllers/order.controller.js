import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxPrice,
    itemPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

export const getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }
  return res.status(200).json({
    success: true,
    message: "order found",
    order,
  });
});
export const getMyOrder = catchAsync(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }
  return res.status(200).json({
    success: true,
    message: "order found",
    order,
  });
});
export const getAllOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  return res.status(200).json({
    success: true,
    message: "all orders",
    orders,
    totalAmount,
  });
});

export const updateOrderStatus = catchAsync(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);
  if (!orders) {
    return next(new ApiError(404, "Order not found"));
  }
  if (orders.orderStatus === "Delivered") {
    return next(new ApiError(400, "Order already delivered"));
  }
  await Promise.all(
    orders.orderItems.map((item) => updateQuantity(item.product, item.quantity))
  );
  orders.orderStatus = req.body.status;
  if (orders.orderStatus === "Delivered") {
    orders.deliveredAt = Date.now();
  }
  await orders.save({ validateBeforeSave: false });
  return res.status(200).json({
    success: true,
    message: "changed order status",
    orders,
  });
});
async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

export const removeOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }
  if (order.orderStatus !== "Delivered") {
    return next(new ApiError(400, "Order is not completed yet."));
  }
  await Order.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    success: true,
    message: "Order removed successfully",
  });
});

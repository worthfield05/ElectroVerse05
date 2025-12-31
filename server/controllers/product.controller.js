import Product from "../models/product.model.js";
import ApiFunctionality from "../utils/ApiFunctionality.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/customError.js";

export const createProduct = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const resultsPerPage = 3;
  const apiFeatures = new ApiFunctionality(Product.find(), req.query)
    .search()
    .filter();
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;
  if (page > totalPages && productCount > 0) {
    return next(new ApiError(404, "This page doesn't exist"));
  }
  apiFeatures.pagination(resultsPerPage);

  const products = await apiFeatures.query;
  if (!products || products.length === 0) {
    return next(new ApiError("No product found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "All products",
    products,
    productCount,
    totalPages,
    currentPage: page,
    resultsPerPage,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  return res
    .status(200)
    .json({ success: true, message: "product update successfully", product });
});

export const removeProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  return res
    .status(200)
    .json({ success: true, message: "Deleted successfully", product });
});

export const getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  return res
    .status(200)
    .json({ success: true, message: "product found successfully", product });
});

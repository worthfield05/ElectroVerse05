import ApiError from "../utils/customError.js";
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //CastError
  if (err.name === "CastError") {
    const message = `This is invalid resource ${err.path}`;
    err = new ApiError(404, message);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

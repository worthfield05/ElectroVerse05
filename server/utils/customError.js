class ApiError extends Error {
  constructor(statusCode, message, error = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ApiError;

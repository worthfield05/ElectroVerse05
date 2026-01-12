import express from "express";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use(morgan("dev"));

app.use("/api/v1", productRoute);
app.use("/api/v1/auth", userRoute);
app.use("/api/v1", orderRoute);
app.use(errorMiddleware);
export default app;

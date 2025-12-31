import express from "express";
import productRoute from "./routes/product.route.js";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1", productRoute);
app.use(errorMiddleware);
export default app;

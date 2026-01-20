import app from "./app.js";
import { dbConnect } from "./configs/db.config.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ path: "server/configs/config.env" });
const port = process.env.PORT || 8000;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down, due to unhandled exception rejection`);
  process.exit(1);
});

const server = app.listen(port, () => {
  console.log("Server is running on port ", port);
  dbConnect();
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down, due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

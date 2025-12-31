import app from "./app.js";
import { dbConnect } from "./configs/db.config.js";
import dotenv from "dotenv";
dotenv.config({ path: "server/configs/config.env" });
const port = process.env.PORT || 8000;

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

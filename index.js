import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running!");
});
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/", protectedRoutes);
app.use("/api/order", orderRoutes);
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!`)
);

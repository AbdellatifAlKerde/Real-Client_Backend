import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running!");
});
app.use("/api/admin", adminRoutes);
app.use("/api/training", trainingRoutes);
app.use('/category' , categoryRoutes);

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);

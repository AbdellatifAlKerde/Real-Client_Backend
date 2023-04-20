import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import verifyToken from "./middleware/admin.js";
import adminRoutes from "./routes/adminRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome to our Website 🙌");
});

app.get("/", (req, res) => {
  res.send("API is running!");
});
app.use("/api/admin", adminRoutes);
app.use("/api/training", trainingRoutes);

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);

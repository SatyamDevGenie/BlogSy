// 📦 Imports
import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// 🛣️ Routes
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ⚙️ Environment Setup
dotenv.config();
connectDB();

const app = express();

// 🛠️ Middlewares
app.use(express.json());
app.use(cookieParser());





// ✅ Serve uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ API Check
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);



// ❌ Error handling
app.use(notFound);
app.use(errorHandler);

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    chalk.yellowBright(
      `📡 Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
    )
  );
});

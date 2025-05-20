// 📦 Imports
import dotenv from "dotenv"; // 🛠️ Load environment variables
import express from "express"; // 🚀 Create Express app
import chalk from "chalk"; // 🎨 Stylish console logs
import cors from "cors"; // 🌐 Enable CORS
import path from "path"; // 📁 For static file handling
import connectDB from "./config/db.js"; // 🔗 MongoDB connection
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"; // ❌ Error handlers

// 🛣️ Routes
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; // 📤 File upload route

// ⚙️ Environment Setup
dotenv.config(); // 📂 Load .env variables
connectDB(); // 🧬 Connect to MongoDB

const app = express(); // 🖥️ Initialize Express server

// 🛠️ Middlewares
app.use(express.json()); // 📨 Parse JSON request body
app.use(cors()); // 🔓 Allow cross-origin requests


// Correct way to serve static files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// ✅ API Health Check
app.get("/", (req, res) => {
  res.send("BlogSy API is running");
});

// 🛣️ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes); // File upload route

// ❌ Error handling middlewares
app.use(notFound); // 404 Not Found
app.use(errorHandler); // General error handler

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    chalk.yellowBright(
      `📡 Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
    )
  );
});

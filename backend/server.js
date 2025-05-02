// 📦 Imports
import dotenv from "dotenv";             // 🛠️ Load environment variables
import express from "express";           // 🚀 Create Express app
import chalk from "chalk";               // 🎨 Stylish console logs
import cors from "cors";                 // 🌐 Enable CORS
import connectDB from "./config/db.js";  // 🔗 MongoDB connection
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"; // ❌ Error handlers
import authRoutes from "./routes/authRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"

dotenv.config();    // 📂 Load .env variables
connectDB();        // 🧬 Connect to MongoDB

const app = express(); // 🖥️ Initialize Express server

// 🔧 Middlewares
app.use(express.json()); // 📨 Parse JSON request body
app.use(cors());         // 🔓 Allow cross-origin requests

// ✅ Root route
app.get("/", (req, res) => {
  res.send("BlogSy API is running"); // 🟢 API Health Check
});


// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes)


// ❌ Error handling middlewares
app.use(notFound);      // 404 Not Found
app.use(errorHandler);  // General error handler

// ⚙️ Set port
const PORT = process.env.PORT || 5000;

// 🚀 Start server
app.listen(PORT, () => {
  console.log(
    chalk.yellowBright(`📡 Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
  );
});

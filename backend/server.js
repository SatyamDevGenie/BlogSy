// Importing necessary packages
import dotenv from "dotenv"; // 🛠️ For loading environment variables
import express from "express"; // 🚀 For creating the Express server
import chalk from "chalk"; // 🎨 For colored console output
import cors from "cors"; // 🌐 For enabling Cross-Origin Resource Sharing
import connectDB from "./config/db.js"; // 🗄️ Custom function to connect to MongoDB

dotenv.config(); // 🗂️ Load environment variables from .env
connectDB(); // 🔗 Connect to MongoDB

const app = express(); // 🖥️ Initialize Express app

// Middleware to parse JSON request bodies
app.use(express.json()); // 📥 Parse incoming JSON data
// Middleware to allow cross-origin requests
app.use(cors()); // 🌍 Enable CORS

// Basic route to check API status
app.get("/", (req, res) => {
  res.send("BlogSy API is running"); // ✅ Confirm API is running
});

// Define port, default to 5000 if not provided in env
const PORT = process.env.PORT || 5000; // ⚙️ Setup the port

// Start the server and log the status with colored output
app.listen(PORT, () => {
  console.log(
    chalk.yellowBright( // 🎨 Colored log
      `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}` // 📡 Log mode and port
    )
  );
});

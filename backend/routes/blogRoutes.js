import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Create a new blog (protected)
router.post("/create", protect, createBlog);

// ✏️ Update a blog (protected)
router.put("/:id", protect, updateBlog);

// 🗑️ Delete a blog (protected)
router.delete("/:id", protect, deleteBlog);

// 📚 Get all blogs
router.get("/", getAllBlogs);

// 🔍 Get a single blog
router.get("/:id", getSingleBlog);

export default router;

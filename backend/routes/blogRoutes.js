import express from "express";
import { createBlog,updateBlog } from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createBlog); // create blog
router.put("/:id", protect, updateBlog); // Update blog

export default router;

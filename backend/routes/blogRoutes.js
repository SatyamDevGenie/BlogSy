import express from "express";
import { createBlog } from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createBlog);

export default router;

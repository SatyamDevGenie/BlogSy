import express from "express";
import { followUser } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);

export default router;

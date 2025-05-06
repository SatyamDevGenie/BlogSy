import express from "express";
import {
  followUser,
  addFavourite,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);
router.put("/favourite/:id", protect, addFavourite);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;

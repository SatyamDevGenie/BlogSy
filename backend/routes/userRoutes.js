import express from "express";
import {
  followUser,
  unfollowUser,
  addFavourite,
  removeFavourite,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);
router.put("/favourites/:id", protect, addFavourite);
router.delete("/favourites/:id", protect, removeFavourite);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;

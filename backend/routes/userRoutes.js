import express from "express";
import {
  followUser,
  unfollowUser,
  addFavourite,
  removeFavourite,
  getUserProfile,
  updateUserProfile,
  checkFollowStatus
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);
router.get("/:id/follow-status", protect, checkFollowStatus); // Add this new route
router.put("/favourites/:id", protect, addFavourite);
router.delete("/favourites/:id", protect, removeFavourite);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;

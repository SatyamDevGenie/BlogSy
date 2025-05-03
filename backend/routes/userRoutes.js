import express from "express";
import { followUser, addFavourite } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/follow/:id", protect, followUser);
router.put("/favourite/:id", protect, addFavourite);

export default router;

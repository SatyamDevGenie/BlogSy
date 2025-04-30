// 📦 Import dependencies
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// 🛣 Initialize router
const router = express.Router();

// 📝 Route to register user
router.post("/register", registerUser);

// 🔑 Route to login user
router.post("/login", loginUser);

// 📤 Export the router
export default router;

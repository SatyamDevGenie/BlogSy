// 📦 Import dependencies
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

// 🛣 Initialize router
const router = express.Router();

// 📝 Route to register user
router.post("/register", registerUser);

// 🔑 Route to login user
router.post("/login", loginUser);

// 🔑 Route to logout user
router.post("/logout", logoutUser); // 👈 Add this route

// 📤 Export the router
export default router;

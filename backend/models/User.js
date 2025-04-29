// 📦 Import mongoose
import mongoose from "mongoose";

// 👤 Define User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // 🆔 Unique username
    email: { type: String, required: true, unique: true }, // 📧 Unique email
    password: { type: String, required: true }, // 🔒 Hashed password
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ➕ Followed users
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }], // ⭐ Favorite blogs
  },
  { timestamps: true } // 🕒 createdAt & updatedAt fields
);

// 📤 Export User model
const User = mongoose.model("User", userSchema);
export default User;

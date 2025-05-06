// 📦 Import mongoose
import mongoose from "mongoose";

// 📝 Define Blog schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // 🏷️ Blog title
    content: { type: String, required: true }, // ✍️ Blog content
    image: { type: String, default: "" }, // 🖼️ Blog image URL
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🧑‍💻 Reference to blog author
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ❤️ Users who liked
    views: { type: Number, default: 0 }, // 👈 For trending
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 💬 Commenting user
        comment: { type: String }, // 💭 Comment text
        createdAt: { type: Date, default: Date.now }
      },
    ],
  },
  { timestamps: true } // ⏰ Created and updated times
);

// 📤 Export the model
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

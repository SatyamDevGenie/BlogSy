import User from "../models/User.js";
import Blog from "../models/Blog.js";

// 👤 Follow user
const followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self-follow
    if (targetUser._id.equals(currentUser._id)) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    // Prevent duplicate follows
    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
      currentUser.following.push(targetUser._id);

      await targetUser.save();
      await currentUser.save();

      return res.json({ message: "User followed successfully" });
    } else {
      return res.status(400).json({ message: "Already following this user" });
    }
  } catch (error) {
    console.error("Follow error:", error);
    res.status(500).json({
      message: "Server error while following user",
      error: error.message,
    });
  }
};

// ⭐ Add blog to favourites
const addFavourite = async (req, res) => {
  try {
    const blogId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favourites.includes(blogId)) {
      user.favourites.push(blogId);
      await user.save();
      return res.json({ message: "Blog added to favourites" });
    } else {
      return res.status(400).json({ message: "Blog already in favourites" });
    }
  } catch (error) {
    console.error("Add favourite error:", error);
    res.status(500).json({
      message: "Server error while adding to favourites",
      error: error.message,
    });
  }
};

// 📄 Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("followers", "username")
      .populate("following", "username")
      .populate({
        path: "favourites",
        populate: { path: "author", select: "username" },
      });

    const blogs = await Blog.find({ author: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ user, blogs });
  } catch (error) {
    console.error("Get profile error:", error);
    res
      .status(500)
      .json({
        message: "Server error while getting profile",
        error: error.message,
      });
  }
};

export { followUser, addFavourite, getUserProfile };

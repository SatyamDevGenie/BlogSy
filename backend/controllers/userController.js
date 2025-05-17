import User from "../models/User.js";
import Blog from "../models/Blog.js";
import bcrypt from "bcryptjs";

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

// 👤 Unfollow user
const unfollowUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self-unfollow
    if (targetUser._id.equals(currentUser._id)) {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }

    // Check if the user is following before removing
    const isFollowing = targetUser.followers.includes(currentUser._id);

    if (!isFollowing) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Remove from followers & following
    targetUser.followers.pull(currentUser._id);
    currentUser.following.pull(targetUser._id);

    await targetUser.save();
    await currentUser.save();

    return res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow error:", error);
    res.status(500).json({
      message: "Server error while unfollowing user",
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

// ⭐ Remove blog from favourites
const removeFavourite = async (req, res) => {
  try {
    const blogId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favourites.includes(blogId)) {
      user.favourites = user.favourites.filter(
        (id) => id.toString() !== blogId
      );
      await user.save();
      return res.json({ message: "Blog removed from favourites" });
    } else {
      return res.status(400).json({ message: "Blog not found in favourites" });
    }
  } catch (error) {
    console.error("Remove favourite error:", error);
    res.status(500).json({
      message: "Server error while removing from favourites",
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
    res.status(500).json({
      message: "Server error while getting profile",
      error: error.message,
    });
  }
};


// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Handle password change (if provided)
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      message: "User profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Server error while updating profile",
      error: error.message,
    });
  }
};

export {
  followUser,
  unfollowUser,
  addFavourite,
  removeFavourite,
  getUserProfile,
  updateUserProfile,
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UserIcon,
  MailIcon,
  HeartIcon,
  FileTextIcon,
  UsersIcon,
  UserPlusIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingBlogId, setDeletingBlogId] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get("/api/users/profile", config);
      setProfile(data.user);
      setBlogs(data.blogs);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Login required");
      return;
    }
    fetchProfile();
  }, [token]);

  const handleRemoveFromFavourites = async (blogId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/users/favourites/${blogId}`, config); // ✅ Matches backend route
      fetchProfile(); // Refresh profile
    } catch (err) {
      alert("Failed to remove from favourites");
    }
  };

  const handleDeleteBlog = async (blogId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      setDeletingBlogId(blogId);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/blogs/${blogId}`, config);
      fetchProfile();
    } catch {
      alert("Failed to delete blog");
    } finally {
      setDeletingBlogId(null);
    }
  };

  const handleEditProfile = () => navigate("/updateProfile");

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  if (loading)
    return (
      <p className="p-8 text-center text-gray-600 text-lg font-medium">
        Loading profile...
      </p>
    );
  if (error)
    return (
      <p className="p-8 text-center text-red-600 font-semibold text-lg">
        {error}
      </p>
    );
  if (!profile) return null;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-8 sm:mt-12 bg-gradient-to-tr from-white via-slate-100 to-white rounded-xl shadow-xl space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="relative text-center px-4 sm:px-0 max-w-screen-lg mx-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 mb-2">
          <h1 className="text-2xl sm:text-4xl font-semibold text-slate-800 flex items-center justify-center">
            <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-2" />
            <span className="truncate">{profile.username}'s Profile</span>
          </h1>

          {/* Edit Button - shown on right for sm and up, stacked on mobile */}
          <motion.button
            onClick={handleEditProfile}
            className="sm:absolute sm:right-4 sm:top-2 mt-2 sm:mt-0 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit your Profile</span>
          </motion.button>
        </div>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          Welcome back to your dashboard
        </p>
      </motion.div>

      {/* Basic Info */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-screen-md mx-auto w-full"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-slate-800">
          <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-gray-500" />
          Basic Info
        </h2>

        <div className="space-y-3 text-gray-700 text-sm sm:text-base break-words">
          {/* Email */}
          <p className="flex flex-wrap">
            <strong className="mr-1">Email:</strong>
            <span className="truncate">{profile.email}</span>
          </p>

          {/* Followers */}
          <p className="flex flex-wrap items-center">
            <strong className="mr-1 flex items-center">
              <UsersIcon className="inline w-4 h-4 mr-1 text-green-600" />
              Followers:
            </strong>
            <span className="break-words">
              {profile.followers.length
                ? profile.followers.map((f) => f.username).join(", ")
                : "No followers"}
            </span>
          </p>

          {/* Following */}
          <p className="flex flex-wrap items-center">
            <strong className="mr-1 flex items-center">
              <UserPlusIcon className="inline w-4 h-4 mr-1 text-indigo-600" />
              Following:
            </strong>
            <span className="break-words">
              {profile.following.length
                ? profile.following.map((f) => f.username).join(", ")
                : "None"}
            </span>
          </p>
        </div>
      </motion.section>

      {/* Favourites */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-screen-md mx-auto w-full"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-pink-700">
          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Favourite Blogs
        </h2>

        {profile.favourites.length ? (
          <ul className="space-y-4">
            {profile.favourites.map((fav) => (
              <motion.li
                key={fav._id}
                className="bg-pink-50 border-l-4 border-pink-500 px-4 py-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  onClick={() => handleBlogClick(fav._id)}
                  className="w-full sm:max-w-[70%]"
                >
                  <strong className="text-slate-800 block truncate text-base sm:text-lg">
                    {fav.title}
                  </strong>
                  <span className="text-pink-700 text-xs sm:text-sm block mt-1 sm:mt-0">
                    by {fav.author.username}
                  </span>
                </div>
                <button
                  className="px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600 self-start sm:self-auto"
                  onClick={() => handleRemoveFromFavourites(fav._id)}
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            No favourites yet.
          </p>
        )}
      </motion.section>

      {/* My Blogs */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-screen-md mx-auto w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-6 flex items-center text-blue-700">
          <FileTextIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          My Blogs
        </h2>

        {blogs.length ? (
          <ul className="space-y-6">
            {blogs.map((blog) => (
              <motion.li
                key={blog._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 border-l-4 border-blue-500 px-4 py-4 rounded gap-4 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleBlogClick(blog._id)}
              >
                {/* Image first on mobile, then content below */}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded mb-3 sm:mb-0 sm:mr-4 sm:w-28 sm:h-20"
                  />
                )}

                <div className="flex flex-col overflow-hidden">
                  <strong className="text-slate-800 text-base sm:text-lg truncate">
                    {blog.title}
                  </strong>
                  <p className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">
                    {blog.content}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            You haven't written any blogs yet.
          </p>
        )}
      </motion.section>
    </motion.div>
  );
}

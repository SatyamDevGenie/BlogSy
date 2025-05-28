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
        className="text-center relative"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-1 flex flex-wrap items-center justify-center text-center">
          <UserIcon className="inline w-7 h-7 sm:w-8 sm:h-8 mr-2 text-blue-500" />
          {profile.username}'s Profile
        </h1>
        <p className="text-sm text-gray-500">Welcome back to your dashboard</p>
        <motion.button
          onClick={handleEditProfile}
          className="absolute right-2 top-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PencilIcon className="w-4 h-4 mr-1" />
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Basic Info */}
      <motion.section
        className="bg-white rounded-lg shadow p-4 sm:p-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
          <MailIcon className="w-5 h-5 mr-2 text-gray-500" />
          Basic Info
        </h2>
        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <p><strong>Email:</strong> {profile.email}</p>
          <p>
            <strong>
              <UsersIcon className="inline w-4 h-4 mr-1 text-green-600" />
              Followers:
            </strong>{" "}
            {profile.followers.length
              ? profile.followers.map((f) => f.username).join(", ")
              : "No followers"}
          </p>
          <p>
            <strong>
              <UserPlusIcon className="inline w-4 h-4 mr-1 text-indigo-600" />
              Following:
            </strong>{" "}
            {profile.following.length
              ? profile.following.map((f) => f.username).join(", ")
              : "None"}
          </p>
        </div>
      </motion.section>

      {/* Favourites */}
      <motion.section
        className="bg-white rounded-lg shadow p-4 sm:p-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
          <HeartIcon className="w-5 h-5 mr-2 text-pink-600" />
          Favourite Blogs
        </h2>
        {profile.favourites.length ? (
          <ul className="space-y-4">
            {profile.favourites.map((fav) => (
              <motion.li
                key={fav._id}
                className="bg-pink-50 border-l-4 border-pink-500 px-4 py-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div onClick={() => handleBlogClick(fav._id)} className="w-full">
                  <strong className="text-slate-800 block truncate">{fav.title}</strong>
                  <span className="text-pink-700 text-sm">by {fav.author.username}</span>
                </div>
                <button
                  className="px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleRemoveFromFavourites(fav._id)}
                >
                  Remove
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No favourites yet.</p>
        )}
      </motion.section>

      {/* My Blogs */}
      <motion.section
        className="bg-white rounded-lg shadow p-4 sm:p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center">
          <FileTextIcon className="w-5 h-5 mr-2 text-blue-600" />
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
                <div className="flex items-start sm:items-center gap-4 w-full">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full sm:w-28 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <strong className="text-slate-800 text-lg truncate">{blog.title}</strong>
                    <p className="text-gray-700 text-sm mt-1 line-clamp-2">{blog.content}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't written any blogs yet.</p>
        )}
      </motion.section>
    </motion.div>
  );
}


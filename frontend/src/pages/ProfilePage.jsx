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
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      await axios.delete(`/api/users/favourites/${blogId}`, config);
      fetchProfile();
    } catch (err) {
      alert("Failed to remove from favourites");
    }
  };

  const handleEditProfile = () => navigate("/updateProfile");
  const handleBlogClick = (id) => navigate(`/blogs/${id}`);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-600 font-semibold text-lg">
        {error}
      </p>
    );
  }

  if (!profile) return null;

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-6 mt-8 sm:mt-12 bg-gradient-to-tr from-white via-slate-100 to-white rounded-xl shadow-xl space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="relative text-center max-w-screen-lg mx-auto"
        variants={itemVariants}
      >
        <h1 className="text-2xl sm:text-4xl font-semibold text-slate-800 flex items-center justify-center">
          <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-2" />
          <span className="truncate">{profile.username}'s Profile</span>
        </h1>

        <motion.button
          onClick={handleEditProfile}
          className="absolute right-4 top-4 px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PencilIcon className="w-4 h-4" />
          Edit Profile
        </motion.button>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Welcome back to your dashboard
        </p>
      </motion.div>

      {/* Basic Info */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-6 w-full"
        variants={itemVariants}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-slate-800">
          <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-gray-500" />
          Basic Info
        </h2>
        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
          <div className="flex flex-wrap items-center">
            <strong className="mr-2">Email:</strong>
            <span>{profile?.email || "Not Provided"}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <strong className="mr-2 flex items-center">
              <UsersIcon className="inline w-4 h-4 mr-1 text-green-600" />
              Followers:
            </strong>
            <span>
              {profile?.followers?.length > 0
                ? profile.followers.map((f) => f.username).join(", ")
                : "No followers"}
            </span>
          </div>
          <div className="flex flex-wrap items-center">
            <strong className="mr-2 flex items-center">
              <UserPlusIcon className="inline w-4 h-4 mr-1 text-indigo-600" />
              Following:
            </strong>
            <span>
              {profile?.following?.length > 0
                ? profile.following.map((f) => f.username).join(", ")
                : "None"}
            </span>
          </div>
        </div>
      </motion.section>

      {/* Favourite Blogs */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-6"
        variants={itemVariants}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-pink-700">
          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Favourite Blogs
        </h2>
        {profile.favourites.length ? (
          <ul className="space-y-4">
            {profile.favourites.map((fav, index) => (
              <motion.li
                key={fav._id}
                className="bg-pink-50 border-l-4 border-pink-500 px-4 py-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  onClick={() => handleBlogClick(fav._id)}
                  className="cursor-pointer"
                >
                  <strong className="text-slate-800 block truncate text-base sm:text-lg">
                    {fav.title}
                  </strong>
                  <span className="text-pink-700 text-xs sm:text-sm">
                    by {fav.author.username}
                  </span>
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
        className="bg-white rounded-xl shadow-md p-6"
        variants={itemVariants}
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
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover rounded sm:w-28 sm:h-20"
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
          <p className="text-gray-500">You haven't written any blogs yet.</p>
        )}
      </motion.section>
    </motion.div>
  );
}

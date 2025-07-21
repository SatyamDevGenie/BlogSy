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
  HomeIcon,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Profile Data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get("https://blogsy-yttu.onrender.com/api/users/profile", config);
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

  // ✅ Handlers
  const handleRemoveFromFavourites = async (blogId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`https://blogsy-yttu.onrender.com/api/users/favourites/${blogId}`, config);
      fetchProfile();
    } catch (err) {
      alert("Failed to remove from favourites");
    }
  };

  const handleEditProfile = () => navigate("/updateProfile");
  const handleBlogClick = (id) => navigate(`https://blogsy-yttu.onrender.com/blogs/${id}`);

  // ✅ Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  // ✅ Error State
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
      className="max-w-6xl mx-auto px-4 sm:px-6 py-6 mt-6 sm:mt-12 bg-gradient-to-tr from-white via-slate-100 to-white rounded-xl shadow-xl space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ✅ Back Button */}
      <div className="flex items-center mb-6">
        <motion.button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2
            px-4 py-2 
            bg-gray-100 hover:bg-gray-200 
            text-gray-700 rounded-lg shadow 
            text-sm font-medium
            transition-all duration-200
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HomeIcon className="w-4 h-4 text-blue-600" />
          Back to Home
        </motion.button>
      </div>

      {/* ✅ Header Section */}
      <motion.div className="relative text-center" variants={itemVariants}>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-800 flex flex-wrap items-center justify-center gap-2">
          <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          <span>{profile.username}'s Profile</span>
        </h1>

        {/* ✅ Responsive Edit Button */}
        <motion.button
          onClick={handleEditProfile}
          className="
            mt-4 sm:mt-0
            block sm:absolute sm:right-6 sm:top-4
            px-4 py-2 
            text-sm sm:text-base 
            font-medium text-white 
            bg-blue-600 rounded-lg shadow 
            hover:bg-blue-700 
            flex items-center justify-center gap-2
            mx-auto sm:mx-0
          "
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

      {/* ✅ Basic Info Section */}
      <motion.section
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
        variants={itemVariants}
      >
        {/* Section Heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-slate-800">
          <MailIcon className="w-6 h-6 mr-3 text-blue-600" />
          Basic Info
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm sm:text-base">

          {/* Email */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition">
            <div className="bg-blue-100 p-2 rounded-full">
              <MailIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Email</p>
              <p className="font-medium">{profile?.email || "Not Provided"}</p>
            </div>
          </div>

          {/* Followers */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition">
            <div className="bg-green-100 p-2 rounded-full">
              <UsersIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Followers</p>
              <p className="font-medium">
                {profile?.followers?.length
                  ? profile.followers.map((f) => f.username).join(", ")
                  : "No followers"}
              </p>
            </div>
          </div>

          {/* Following */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition sm:col-span-2">
            <div className="bg-indigo-100 p-2 rounded-full">
              <UserPlusIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Following</p>
              <p className="font-medium">
                {profile?.following?.length
                  ? profile.following.map((f) => f.username).join(", ")
                  : "None"}
              </p>
            </div>
          </div>

        </div>
      </motion.section>


      {/* ✅ Favourite Blogs */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-4 sm:p-6"
        variants={itemVariants}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-pink-700">
          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Favourite Blogs
        </h2>
        {profile.favourites.length ? (
          <div className="flex flex-col gap-4">
            {profile.favourites.map((fav) => (
              <motion.div
                key={fav._id}
                className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  onClick={() => handleBlogClick(fav._id)}
                  className="cursor-pointer flex-1"
                >
                  <strong className="text-slate-800 block truncate text-base sm:text-lg">
                    {fav.title}
                  </strong>
                  <span className="text-pink-700 text-xs sm:text-sm">
                    by {fav.author.username}
                  </span>
                </div>
                <button
                  className="
                    px-2 py-1 
                    text-[10px] sm:text-xs
                    bg-red-500 text-white 
                    rounded 
                    hover:bg-red-600 
                    transition-all duration-200
                    whitespace-nowrap
                  "
                  onClick={() => handleRemoveFromFavourites(fav._id)}
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favourites yet.</p>
        )}
      </motion.section>

      {/* ✅ My Blogs */}
      <motion.section
        className="bg-white rounded-xl shadow-md p-4 sm:p-6"
        variants={itemVariants}
      >
        <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-blue-700">
          <FileTextIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          My Blogs
        </h2>

        {blogs.length ? (
          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="
                  flex flex-col sm:flex-row items-start 
                  bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow hover:shadow-lg 
                  overflow-hidden transition-all duration-300
                  cursor-pointer
                "
                whileHover={{ scale: 1.02 }}
                onClick={() => handleBlogClick(blog._id)}
              >
                {/* ✅ Blog Image */}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="
                      w-full sm:w-40 h-32 sm:h-auto object-cover
                      sm:rounded-none rounded-t-lg
                    "
                  />
                )}

                {/* ✅ Blog Content */}
                <div className="p-4 flex-1">
                  <strong className="text-slate-800 text-base sm:text-lg block mb-1 truncate">
                    {blog.title}
                  </strong>
                  <p className="text-gray-700 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                    {blog.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't written any blogs yet.</p>
        )}
      </motion.section>
    </motion.div>
  );
}

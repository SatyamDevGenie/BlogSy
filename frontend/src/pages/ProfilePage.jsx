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
  PlusCircleIcon,
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

  const handleAddToFavourites = async (blogId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/blogs/${blogId}/favourite`, {}, config);
      fetchProfile();
    } catch {
      alert("Failed to add to favourites");
    }
  };

  const handleEditProfile = () => navigate("/updateProfile");

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!profile) return null;

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 mt-12 bg-gradient-to-tr from-white via-slate-100 to-white rounded-xl shadow-xl space-y-10"
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
        <h1 className="text-4xl font-bold text-slate-800 mb-1">
          <UserIcon className="inline w-8 h-8 mr-2 text-blue-500" />
          {profile.username}'s Profile
        </h1>
        <p className="text-sm text-gray-500">Welcome back to your dashboard</p>
        <motion.button
          onClick={handleEditProfile}
          className="absolute right-0 top-0 mt-2 mr-2 flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PencilIcon className="w-4 h-4 mr-1" />
          Edit Profile
        </motion.button>
      </motion.div>

      {/* Basic Info */}
      <motion.section
        className="bg-white rounded-lg shadow p-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <MailIcon className="w-5 h-5 mr-2 text-gray-500" />
          Basic Info
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
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
        className="bg-white rounded-lg shadow p-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <HeartIcon className="w-5 h-5 mr-2 text-pink-600" />
          Favourite Blogs
        </h2>
        {profile.favourites.length ? (
          <ul className="space-y-2">
            {profile.favourites.map((fav) => (
              <motion.li
                key={fav._id}
                className="bg-pink-50 border-l-4 border-pink-500 px-4 py-2 rounded"
                whileHover={{ scale: 1.02 }}
              >
                <strong className="text-slate-800">{fav.title}</strong> by{" "}
                <span className="text-pink-700">{fav.author.username}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No favourites yet.</p>
        )}
      </motion.section>

      {/* My Blogs */}
      <motion.section
        className="bg-white rounded-lg shadow p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FileTextIcon className="w-5 h-5 mr-2 text-blue-600" />
          My Blogs
        </h2>
        {blogs.length ? (
          <ul className="space-y-3">
            {blogs.map((blog) => {
              const isFav = profile.favourites.some((f) => f._id === blog._id);
              return (
                <motion.li
                  key={blog._id}
                  className="flex justify-between items-center bg-blue-50 border-l-4 border-blue-500 px-4 py-2 rounded"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <strong className="text-slate-800">{blog.title}</strong>
                  </div>
                  {!isFav && (
                    <motion.button
                      onClick={() => handleAddToFavourites(blog._id)}
                      className="flex items-center text-sm text-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusCircleIcon className="w-4 h-4 mr-1" />
                      Add to Favourites
                    </motion.button>
                  )}
                </motion.li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't written any blogs yet.</p>
        )}
      </motion.section>
    </motion.div>
  );
}

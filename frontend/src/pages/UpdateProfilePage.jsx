import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  SaveIcon,
  ArrowLeftIcon,
} from "lucide-react";

import { updateProfile, reset } from "../features/auth/authSlice"; // adjust the path if needed

export default function UpdateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const token = user?.token;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
    });

    return () => {
      dispatch(reset()); // Clear success/error messages on unmount
    };
  }, [token, user, dispatch]);

  const [localMessage, setLocalMessage] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setLocalMessage("Profile updated successfully!");
    }
    if (isError) {
      setLocalError(message);
    }
  }, [isSuccess, isError, message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalMessage(null);
    setLocalError(null);
    dispatch(updateProfile(formData));
  };

  return (
    <motion.div
      className="w-full max-w-xl sm:max-w-2xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 md:p-10 bg-white rounded-lg shadow space-y-10 sm:space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-slate-800 flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
        Update Profile
      </motion.h2>

      {localMessage && (
        <motion.p
          className="text-green-600 text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {localMessage}
        </motion.p>
      )}

      {localError && (
        <motion.p
          className="text-red-600 text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {localError}
        </motion.p>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password (optional)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-6">
          <motion.button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SaveIcon className="w-4 h-4 mr-2" />
            Save Changes
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full sm:w-auto flex items-center justify-center text-gray-600 hover:text-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Profile
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

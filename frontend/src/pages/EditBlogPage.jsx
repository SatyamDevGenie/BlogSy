import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function EditBlogPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [errorBlog, setErrorBlog] = useState("");

  // Fetch Blog Data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(`/api/blogs/${id}`, config);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          image: res.data.image || "",
        });
        setImagePreview(res.data.image || "");
        setLoadingBlog(false);
      } catch (err) {
        setErrorBlog("⚠️ Failed to load blog for editing.");
        setLoadingBlog(false);
      }
    };

    if (user?.token) {
      fetchBlog();
    } else {
      setErrorBlog("❌ Unauthorized access.");
      setLoadingBlog(false);
      toast.error("Unauthorized access. Please log in.");
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return formData.image;

    const formImg = new FormData();
    formImg.append("image", imageFile);

    try {
      const { data } = await axios.post("/api/upload/", formImg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.filePath;
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImage = await handleImageUpload();
    if (!uploadedImage) return;

    const updatedData = {
      ...formData,
      image: uploadedImage,
    };

    dispatch(updateBlog({ id, formData: updatedData }))
      .unwrap()
      .then(() => {
        toast.success("✅ Blog Updated Successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("❌ Failed to update blog. Please try again.");
      });
  };

  if (loadingBlog)
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-gray-600 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ⏳ Loading blog data...
      </motion.div>
    );

  if (errorBlog)
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-red-600 text-lg font-medium px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {errorBlog}
      </motion.div>
    );

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-slate-800"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        ✍️ Edit Blog
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your blog content..."
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <motion.img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-56 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>

        {/* Error */}
        {isError && <p className="text-red-500 text-sm">{message}</p>}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <>
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-4 h-4"></span>
              Updating...
            </>
          ) : (
            "Update Blog"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

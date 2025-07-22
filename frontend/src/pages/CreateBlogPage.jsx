import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/blog/blogSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const { data } = await axios.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.filePath;
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !imageFile) {
      return toast.error("All fields are required.");
    }

    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return;

    const blogData = { title, content, image: uploadedImageUrl };
    dispatch(createBlog(blogData));
    navigate("/");

    toast.success("✅ Blog Created Successfully");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 Create Your Blog
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy blog title"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <textarea
              rows="6"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something engaging..."
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {imagePreview && (
              <motion.img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin border-2 border-t-2 border-white rounded-full w-4 h-4"></span>
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}











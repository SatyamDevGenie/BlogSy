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
  className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <motion.div
    className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-200"
    initial={{ scale: 0.97 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.4 }}
  >
    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
      📝 Create Your Blog
    </h2>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Blog Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a catchy blog title"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 text-gray-800 transition-all hover:shadow-md"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Blog Content
        </label>
        <textarea
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something engaging..."
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 text-gray-800 transition-all hover:shadow-md resize-none"
        ></textarea>
      </div>

      {/* Image Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all cursor-pointer">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Upload Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center gap-2 text-gray-500"
        >
          <span className="text-4xl text-blue-500">📷</span>
          <span className="text-sm">Click or drag & drop to upload</span>
        </label>

        {imagePreview && (
          <motion.img
            src={imagePreview}
            alt="Preview"
            className="mt-6 w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 text-lg"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <>
              <span className="animate-spin border-4 border-t-4 border-white rounded-full w-5 h-5"></span>
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











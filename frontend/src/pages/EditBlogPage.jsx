import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, config);
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
      const { data } = await axios.post("/api/upload", formImg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.filePath;
    } catch (err) {
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
        style: {
          fontSize: "14px",
          padding: "10px 16px",
          background: "#ffe4e6",
          color: "#7f1d1d",
          borderRadius: "8px",
          border: "1px solid #fca5a5",
        },
        icon: "🖼️",
      });
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
        toast.success("✅ Blog Updated Successfully", {
          position: "top-center",
          style: {
            fontSize: "14px",
            padding: "10px 16px",
            borderRadius: "8px",
            background: "#ecfdf5",
            color: "#000",
            fontWeight: "bold",
            fontFamily: "Segoe UI, sans-serif",
            border: "1px solid #6ee7b7",
          },
          icon: "✍️",
        });
        navigate("/");
      })
      .catch(() => {
        toast.error("❌ Failed to update blog. Please try again.", {
          position: "top-center",
        });
      });
  };

  if (loadingBlog)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-base">
        ⏳ Loading blog data...
      </div>
    );

  if (errorBlog)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-medium px-4 text-center">
        {errorBlog}
      </div>
    );

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-slate-800">
        ✍️ Edit Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6 border border-gray-200"
      >
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-52 sm:h-64 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-sm font-medium">{message}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

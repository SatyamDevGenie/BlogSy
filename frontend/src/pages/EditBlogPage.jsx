import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBlogPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "", // final image URL for submission
  });

  const [imageFile, setImageFile] = useState(null); // for uploading
  const [imagePreview, setImagePreview] = useState(null); // for UI
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
        setErrorBlog("Failed to load blog for editing.");
        setLoadingBlog(false);
      }
    };

    if (user?.token) {
      fetchBlog();
    } else {
      setErrorBlog("Unauthorized access.");
      setLoadingBlog(false);
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
    if (!imageFile) return formData.image; // return existing image if unchanged

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
      console.error("Image upload failed:", err.message);
      alert("Image upload failed. Please try again.");
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
        navigate(`/blogs/${id}`);
      })
      .catch(() => {
        // error handled by isError
      });
  };

  if (loadingBlog)
    return <div className="p-6 text-center text-gray-600">Loading blog...</div>;
  if (errorBlog)
    return <div className="p-6 text-center text-red-600">{errorBlog}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            required
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-md"
            />
          )}
        </div>
        {isError && <p className="text-red-600">{message}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}








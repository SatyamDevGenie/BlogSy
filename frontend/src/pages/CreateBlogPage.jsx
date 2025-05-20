import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, resetBlog } from "../features/blog/blogSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
  if (isSuccess) {
    dispatch(resetBlog());
    navigate("/"); // Redirect to homepage silently
  }

  if (isError) {
    alert(`Failed: ${message}`);
    dispatch(resetBlog());
  }
}, [isSuccess, isError, message, dispatch, navigate]);

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.filePath; // e.g., http://localhost:5000/uploads/image.jpg
    } catch (err) {
      console.error("Upload Error:", err.message);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !imageFile) {
      return alert("All fields are required.");
    }

    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return;

    const blogData = {
      title,
      content,
      image: uploadedImageUrl,
    };

    dispatch(createBlog(blogData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white mt-10 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">📝 Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded-md"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog here..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-64 object-cover rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

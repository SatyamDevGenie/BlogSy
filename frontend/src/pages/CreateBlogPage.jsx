import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/blog/blogSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bold } from "lucide-react";

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
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.filePath;
    } catch (err) {
      console.error("Upload Error:", err.message);
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
        style: {
          fontSize: "14px",
          padding: "10px 16px",
          background: "#ffe4e6",
          color: "#7f1d1d",
          fontWeight: 500,
          border: "1px solid #fca5a5",
          borderRadius: "8px",
        },
        icon: "❌",
      });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !imageFile) {
      return toast.error("All fields are required.", {
        position: "top-center",
      });
    }

    const uploadedImageUrl = await handleImageUpload();
    if (!uploadedImageUrl) return;

    const blogData = { title, content, image: uploadedImageUrl };
    dispatch(createBlog(blogData));
    navigate("/");

    toast.success("✅ Blog Created Successfully", {
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
      icon: "📝",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          📝 Create Your Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-60 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}









// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createBlog } from "../features/blog/blogSlice";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function CreateBlogPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading } = useSelector((state) => state.blog);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!user) navigate("/login");
//   }, [user, navigate]);

//   const handleImageUpload = async () => {
//     if (!imageFile) return null;

//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       const { data } = await axios.post("/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return data.filePath;
//     } catch (err) {
//       console.error("Upload Error:", err.message);
//       toast.error("Image upload failed. Please try again.");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !content || !imageFile) {
//       return toast.error("All fields are required.");
//     }

//     const uploadedImageUrl = await handleImageUpload();
//     if (!uploadedImageUrl) return;

//     const blogData = { title, content, image: uploadedImageUrl };
//     dispatch(createBlog(blogData));
//     navigate("/");

//     toast.success("Blog created successfully!", {
//       style: {
//         fontSize: "14px",
//         padding: "10px 16px",
//         borderRadius: "8px",
//         background: "#f0f9ff",
//         color: "#0c4a6e",
//         fontWeight: 500,
//         fontFamily: "Segoe UI, sans-serif",
//         border: "1px solid #bae6fd",
//       },
//       iconTheme: {
//         primary: "#0ea5e9",
//         secondary: "#ecfeff",
//       },
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//           📝 Create Your Blog
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Blog Title
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter a catchy blog title"
//               required
//             />
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Blog Content
//             </label>
//             <textarea
//               rows="6"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Write something engaging..."
//               required
//             ></textarea>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Upload Cover Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               required
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="mt-4 w-full h-60 object-cover rounded-md border"
//               />
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300 disabled:opacity-50"
//             >
//               {isLoading ? "Creating..." : "Create Blog"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







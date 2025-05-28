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
      .then(() => navigate("/"))
      .catch(() => {});
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






// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateBlog } from "../features/blog/blogSlice";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function EditBlogPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const { isLoading, isError, message } = useSelector((state) => state.blog);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loadingBlog, setLoadingBlog] = useState(true);
//   const [errorBlog, setErrorBlog] = useState("");

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, config);
//         setFormData({
//           title: res.data.title,
//           content: res.data.content,
//           image: res.data.image || "",
//         });
//         setImagePreview(res.data.image || "");
//         setLoadingBlog(false);
//       } catch (err) {
//         setErrorBlog("⚠️ Failed to load blog for editing.");
//         setLoadingBlog(false);
//       }
//     };

//     if (user?.token) {
//       fetchBlog();
//     } else {
//       setErrorBlog("❌ Unauthorized access.");
//       setLoadingBlog(false);
//     }
//   }, [id, user]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!imageFile) return formData.image;

//     const formImg = new FormData();
//     formImg.append("image", imageFile);

//     try {
//       const { data } = await axios.post("/api/upload", formImg, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return data.filePath;
//     } catch (err) {
//       console.error("Image upload failed:", err.message);
//       alert("Image upload failed. Please try again.");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const uploadedImage = await handleImageUpload();
//     if (!uploadedImage) return;

//     const updatedData = {
//       ...formData,
//       image: uploadedImage,
//     };

//     dispatch(updateBlog({ id, formData: updatedData }))
//       .unwrap()
//       .then(() => navigate("/"))
//       .catch(() => {});
//   };

//   if (loadingBlog)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
//         Loading blog...
//       </div>
//     );

//   if (errorBlog)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-600 text-lg font-medium">
//         {errorBlog}
//       </div>
//     );

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
//         ✍️ Edit Your Blog
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 space-y-6"
//       >
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             placeholder="Enter blog title"
//             className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Content</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows="6"
//             required
//             placeholder="Write your blog content..."
//             className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
//           ></textarea>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Upload New Image (optional)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full text-gray-600"
//           />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mt-4 w-full h-60 object-cover rounded-lg shadow"
//             />
//           )}
//         </div>

//         {isError && (
//           <p className="text-sm text-red-500 mt-1 font-medium">{message}</p>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className=" bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded-lg text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? "Updating..." : "Update Blog"}
//         </button>
//       </form>
//     </div>
//   );
// }

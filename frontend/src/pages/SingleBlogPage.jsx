import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // make sure Heroicons is installed

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, config);
        setBlog(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBlog();
    } else {
      setError("You need to be logged in to view this blog.");
      setLoading(false);
    }
  }, [id, token]);

  if (loading) return <div className="p-6 text-center">Loading blog...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!blog) return <div className="p-6 text-center">Blog not found.</div>;

  return (
    <div className="pb-10">
      {/* Full-width top image with back button */}
      <div className="relative">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-75 object-fill"
          />
        )}
        {/* Go Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          title="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 relative z-10">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-6 whitespace-pre-line">{blog.content}</p>
        <div className="text-sm text-gray-500 mb-4">
          By <strong>{blog.author?.username || "Unknown"}</strong> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="flex space-x-6 text-gray-600 text-sm">
          <span>❤️ {blog.likes?.length || 0} Likes</span>
          <span>👁️ {blog.views || 0} Views</span>
          <span>💬 {blog.comments?.length || 0} Comments</span>
        </div>

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Comments</h2>
          {blog.comments?.length > 0 ? (
            <ul className="space-y-4">
              {blog.comments.map((comment) => (
                <li
                  key={comment._id || comment.createdAt}
                  className="border p-3 rounded-md bg-gray-50"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {comment.user?.username || "Anonymous"}
                  </div>
                  <div className="text-gray-600">{comment.comment}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}






// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";

// export default function SingleBlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = useSelector((state) => state.auth.user);
//   const token = user?.token;

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, config);
//         setBlog(res.data);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to fetch blog. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchBlog();
//     } else {
//       setError("You need to be logged in to view this blog.");
//       setLoading(false);
//     }
//   }, [id, token]);

//   if (loading) {
//     return <div className="p-6 text-center">Loading blog...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">{error}</div>;
//   }

//   if (!blog) {
//     return <div className="p-6 text-center">Blog not found.</div>;
//   }

//   return (
//     <div className="pb-10">
//       {/* Full-width top image */}
//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-75 object-fill"
//         />
//       )}

//       {/* Main Content */}
//       <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 relative z-10">
//         <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

//         <p className="text-gray-700 mb-6 whitespace-pre-line">{blog.content}</p>

//         <div className="text-sm text-gray-500 mb-4">
//           By <strong>{blog.author?.username || "Unknown"}</strong> •{" "}
//           {new Date(blog.createdAt).toLocaleDateString()}
//         </div>

//         <div className="flex space-x-6 text-gray-600 text-sm">
//           <span>❤️ {blog.likes?.length || 0} Likes</span>
//           <span>👁️ {blog.views || 0} Views</span>
//           <span>💬 {blog.comments?.length || 0} Comments</span>
//         </div>

//         {/* Comments */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-3">Comments</h2>
//           {blog.comments?.length > 0 ? (
//             <ul className="space-y-4">
//               {blog.comments.map((comment) => (
//                 <li
//                   key={comment._id || comment.createdAt}
//                   className="border p-3 rounded-md bg-gray-50"
//                 >
//                   <div className="text-sm font-medium text-gray-700">
//                     {comment.user?.username || "Anonymous"}
//                   </div>
//                   <div className="text-gray-600">{comment.comment}</div>
//                   <div className="text-xs text-gray-400">
//                     {new Date(comment.createdAt).toLocaleString()}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No comments yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

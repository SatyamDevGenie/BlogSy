import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading blog...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!blog) return <div className="p-6 text-center text-gray-600">Blog not found.</div>;

  return (
    <div className="pb-16">
      {/* Image Header */}
      <div className="relative">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] sm:h-[475px] object-cover"
          />
        )}

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-200"
          title="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </Link>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="text-sm sm:text-base text-gray-500 mb-4">
            By <span className="font-semibold">{blog.author?.username || "Unknown"}</span> •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>

          <p className="text-gray-700 text-lg leading-relaxed font-medium whitespace-pre-line mb-8">
            {blog.content}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 border-t pt-4">
            <span>❤️ {blog.likes?.length || 0} Likes</span>
            <span>👁️ {blog.views || 0} Views</span>
            <span>💬 {blog.comments?.length || 0} Comments</span>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
          {blog.comments?.length > 0 ? (
            <ul className="space-y-5">
              {blog.comments.map((comment) => (
                <li
                  key={comment._id || comment.createdAt}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      {comment.user?.username || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

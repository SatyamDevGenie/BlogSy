import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

export default function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const fetchBlog = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        `http://localhost:5000/api/blogs/${id}`,
        config
      );
      setBlog(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBlog();
    } else {
      setError("You need to be logged in to view this blog.");
      setLoading(false);
    }
  }, [id, token]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, config);
        navigate("/");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete blog.");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");

    if (!comment.trim()) {
      return setCommentError("Comment cannot be empty.");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `http://localhost:5000/api/blogs/${id}/comment`,
        { comment },
        config
      );
      setBlog((prev) => ({
        ...res.data,
        author: prev.author,
      }));
      setComment("");
    } catch (err) {
      setCommentError(err.response?.data?.message || "Failed to post comment.");
    }
  };

  const handleLikeToggle = async () => {
    if (!user) return alert("Login to like the blog.");
    try {
      setLikeLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(
        `http://localhost:5000/api/blogs/${id}/like`,
        {},
        config
      );
      setBlog(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to like blog.");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) return alert("Login to favorite the blog.");
    try {
      setFavLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(
        `http://localhost:5000/api/users/favourites/${id}`, // ✅ correct endpoint
        {},
        config
      );
      alert(res.data.message); // Optional: show toast
    } catch (err) {
      alert(err.response?.data?.message || "Failed to favorite blog.");
    } finally {
      setFavLoading(false);
    }
  };

  const isOwner = user && blog?.author?._id === user._id;
  const isLikedByUser = blog?.likes?.includes(user?._id);
  const isFavorited = blog?.favorites?.includes(user?._id);

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading blog...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!blog)
    return <div className="p-6 text-center text-gray-600">Blog not found.</div>;

  return (
    <div className="pb-16">
      {/* Header Image */}
      <div className="relative">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] sm:h-[475px] object-fill"
          />
        )}

        <Link
          to="/"
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-200"
          title="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </Link>

        {isOwner && (
          <div className="absolute top-4 right-4 flex gap-3">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              title="Edit Blog"
            >
              <PencilSquareIcon className="h-6 w-6 text-blue-600" />
            </Link>
            <button
              onClick={handleDelete}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              title="Delete Blog"
            >
              <TrashIcon className="h-6 w-6 text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="text-sm sm:text-base text-gray-500 mb-4">
            Created By{" "}
            <span className="font-medium text-gray-700">
              {blog.author?.username || "Unknown"}
            </span>{" "}
            on {new Date(blog.createdAt).toLocaleDateString()}
          </div>

          <p className="text-gray-700 text-lg leading-8 font-medium text-justify whitespace-pre-line mb-8">
            {blog.content}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600 border-t pt-4 items-center">
            <button
              onClick={handleLikeToggle}
              disabled={likeLoading}
              className={`group flex items-center gap-1 text-lg font-medium transition duration-200 ${
                isLikedByUser ? "text-red-600" : "text-gray-600"
              } hover:scale-105 hover:text-red-500 active:scale-95`}
              title={isLikedByUser ? "Unlike" : "Like"}
            >
              <span className="transition duration-200 group-hover:scale-125">
                ❤️
              </span>
              <span>{blog.likes?.length || 0}</span>
              {likeLoading && <span className="ml-1 animate-pulse">...</span>}
            </button>

            <span>👁️ {blog.views || 0} Views</span>
            <span>💬 {blog.comments?.length || 0} Comments</span>
          </div>
        </div>

        {/* Favorite Button */}
        <div className="mt-6 flex">
          <button
            onClick={handleFavoriteToggle}
            disabled={favLoading}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white transition ${
              isFavorited ? "bg-red-500" : "bg-gray-600"
            } hover:scale-105 active:scale-95`}
          >
            <HeartIcon className="h-5 w-5" />
            {isFavorited ? "Favorited" : "Add to Favorites"}
            {favLoading && <span className="animate-pulse ml-2">...</span>}
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Comments
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {commentError && (
                <p className="text-red-500 mt-1">{commentError}</p>
              )}
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <p className="text-gray-600">Login to post a comment.</p>
          )}

          {blog.comments?.length > 0 ? (
            <ul className="space-y-5">
              {blog.comments.map((comment) => (
                <li
                  key={comment._id || comment.createdAt}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">
                      {comment.user?.username || "User"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800">
                    {comment.text || comment.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

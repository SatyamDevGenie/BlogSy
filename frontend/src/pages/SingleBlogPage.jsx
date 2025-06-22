import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  HeartIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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

      // Check follow status if user is logged in and not the author
      if (token && res.data.author?._id !== user?._id) {
        checkFollowStatus(res.data.author._id);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blog.");
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async (authorId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        `http://localhost:5000/api/users/${authorId}/follow-status`,
        config
      );
      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.error("Error checking follow status:", err);
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
        toast.success("✅ Blog Deleted Successfully", {
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
        });
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete blog.");
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
      // Reload the page after successful comment
      window.location.reload();
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
      // Reload the page after successful comment
      window.location.reload();
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
        `http://localhost:5000/api/users/favourites/${id}`,
        {},
        config
      );
      alert(res.data.message);
      // Reload the page after successful comment
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to favorite blog.");
    } finally {
      setFavLoading(false);
    }
  };

  const handleFollowToggle = async () => {
    if (!user) return alert("Please login to follow users");

    try {
      setFollowLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const endpoint = isFollowing ? "unfollow" : "follow";
      await axios.put(
        `http://localhost:5000/api/users/${endpoint}/${blog.author._id}`,
        {},
        config
      );

      setIsFollowing(!isFollowing);
      // Reload the page after successful comment
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update follow status");
    } finally {
      setFollowLoading(false);
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
            className="w-full h-56 sm:h-72 md:h-[400px] lg:h-[475px] object-fit  transition-all duration-300"
          />
        )}

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white p-2 sm:p-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition duration-200"
          title="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
        </Link>

        {/* Edit/Delete Buttons for Owner */}
        {isOwner && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2 sm:gap-3">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="bg-white p-2 sm:p-2.5 rounded-full shadow-md hover:bg-gray-100"
              title="Edit Blog"
            >
              <PencilSquareIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </Link>
            <button
              onClick={handleDelete}
              className="bg-white p-2 sm:p-2.5 rounded-full shadow-md hover:bg-gray-100"
              title="Delete Blog"
            >
              <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10">
          {/* Blog Title and Follow */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-1 sm:mb-2 leading-snug">
                {blog.title}
              </h1>
              <div className="text-xs sm:text-sm text-gray-500">
                Created by{" "}
                <Link
                  to={`/profile/${blog.author?._id}`}
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  {blog.author?.username || "Unknown"}
                </Link>{" "}
                on {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Follow Button - Only show if not owner and user is logged in */}
            {user && !isOwner && blog.author && (
              <button
                onClick={handleFollowToggle}
                disabled={followLoading}
                className={`w-fit sm:w-auto self-start flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isFollowing
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } ${followLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {followLoading ? (
                  <span className="inline-flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isFollowing ? "Unfollowing" : "Following"}
                  </span>
                ) : (
                  <>
                    {isFollowing ? (
                      <>
                        <UserMinusIcon className="h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="h-4 w-4" />
                        Follow
                      </>
                    )}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Blog Content */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium text-justify whitespace-pre-line mb-6 sm:mb-8">
            {blog.content}
          </p>

          {/* Stats Buttons */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t pt-4 items-center justify-start">
            <button
              onClick={handleLikeToggle}
              disabled={likeLoading}
              className={`group flex items-center gap-1 text-base font-medium transition duration-200 ${
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

            <span className="text-sm sm:text-base">
              👁️ {blog.views || 0} Views
            </span>
            <span className="text-sm sm:text-base">
              💬 {blog.comments?.length || 0} Comments
            </span>
          </div>
        </div>

        {/* Favorite Button */}
        <div className="mt-5 sm:mt-6 flex">
          <button
            onClick={handleFavoriteToggle}
            disabled={favLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition ${
              isFavorited ? "bg-red-500" : "bg-gray-600"
            } hover:scale-105 active:scale-95`}
          >
            <HeartIcon className="h-5 w-5" />
            {isFavorited ? "Favorited" : "Add to Favorites"}
            {favLoading && <span className="animate-pulse ml-2">...</span>}
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-12 px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            💬 Comments
          </h2>

          {user ? (
            <form
              onSubmit={handleCommentSubmit}
              className="mb-8 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg space-y-4"
            >
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                rows="3"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
              />
              {commentError && (
                <p className="text-red-500 text-sm">{commentError}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-full text-sm sm:text-base text-white transition shadow-md ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              <span className="italic">Login to post a comment.</span>
            </p>
          )}

          {blog.comments?.length > 0 ? (
            <ul className="space-y-6">
              {blog.comments.map((comment) => (
                <li
                  key={comment._id || comment.createdAt}
                  className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md transition hover:shadow-lg"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-2">
                    {/* Avatar Circle with Initial */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm sm:text-base">
                      {comment.user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {comment.user?.username || "User"}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700 text-sm sm:text-base whitespace-pre-line">
                        {comment.text || comment.comment}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              No comments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

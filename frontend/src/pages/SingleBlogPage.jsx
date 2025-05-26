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
        `http://localhost:5000/api/users/favourites/${id}`,
        {},
        config
      );
      alert(res.data.message);
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
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2 leading-tight">
                {blog.title}
              </h1>
              <div className="text-sm sm:text-base text-gray-500">
                Created By{" "}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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

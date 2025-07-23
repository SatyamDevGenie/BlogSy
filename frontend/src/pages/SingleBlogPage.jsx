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
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const user = useSelector((state) => state.auth.user);
  const token = user?.token;

  const fetchBlog = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        `/api/blogs/${id}`,
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

      const res = await axios.get(`/api/users/${authorId}/follow-status`, config);
      setIsFollowing(res.data.isFollowing);

      toast.info(
        res.data.isFollowing
          ? "✅ You are following this author"
          : "ℹ️ You are not following this author yet",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
        }
      );
    } catch (err) {
      console.error("Error checking follow status:", err);
      toast.error("❌ Failed to check follow status", {
        position: "top-center",
        autoClose: 1500,
      });
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Show the warning box
  };

  const confirmDelete = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`/api/blogs/${id}`, config);
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
    } finally {
      setShowDeleteModal(false);
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
        `/api/blogs/${id}/comment`,
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
    if (!user) {
      return toast.warning("⚠️ Please login to like the blog.", {
        position: "top-center",
        autoClose: 1500,
      });
    }

    try {
      setLikeLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.put(`/api/blogs/${id}/like`, {}, config);

      // ✅ Only update likes, not the entire blog
      setBlog((prev) => ({
        ...prev,
        likes: res.data.likes,
      }));

      const isLiked = res.data.likes.includes(user._id);

      if (isLiked) {
        toast.success("❤️ You liked the blog", {
          position: "bottom-center",
          autoClose: 1500,
          style: {
            fontSize: "14px",
            fontWeight: "600",
            background: "#fef2f2",
            color: "#dc2626",
            borderRadius: "8px",
            padding: "10px 14px",
          },
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to like blog.", {
        position: "bottom-center",
        autoClose: 1500,
      });
    } finally {
      setLikeLoading(false);
    }
  };



  const handleFavoriteToggle = async () => {
    if (!user)
      return toast.warning("⚠️ Please login to favorite the blog.", {
        position: "top-center",
        autoClose: 1500,
      });

    try {
      setFavLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.put(`/api/users/favourites/${id}`, {}, config);

      const message = res.data.message || "Action completed successfully";

      // ✅ Show success toast
      toast.success(message, {
        position: "bottom-center",
        autoClose: 1500,
        style: {
          fontSize: "14px",
          fontWeight: "600",
          background: message.includes("Removed") ? "#fff7ed" : "#fef2f2",
          color: message.includes("Removed") ? "#f97316" : "#dc2626",
          borderRadius: "8px",
          padding: "10px 14px",
        },
      });

      // ✅ Update blog state without reloading page
      setBlog((prev) => ({
        ...prev,
        favorites: res.data.favorites, // Assuming backend returns updated favorites array
      }));

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to favorite blog.", {
        position: "bottom-center",
        autoClose: 1500,
      });
    } finally {
      setFavLoading(false);
    }
  };


  const handleFollowToggle = async () => {
    if (!user)
      return toast.warning("⚠️ Please login to follow users", {
        position: "top-center",
        autoClose: 1500,
      });

    try {
      setFollowLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const endpoint = isFollowing ? "unfollow" : "follow";
      const res = await axios.put(`/api/users/${endpoint}/${blog.author._id}`, {}, config);

      // Update local state
      setIsFollowing(!isFollowing);

      // ✅ Toast notification for follow/unfollow
      toast.success(isFollowing ? "❌ You unfollowed this author" : "✅ You are now following this author", {
        position: "top-center",
        autoClose: 1500,
        style: {
          fontSize: "14px",
          fontWeight: "600",
          background: isFollowing ? "#fff7ed" : "#ecfdf5",
          color: isFollowing ? "#f97316" : "#16a34a",
          borderRadius: "8px",
          padding: "10px 14px",
        },
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update follow status", {
        position: "top-center",
        autoClose: 1500,
      });
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


  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };



  return (
    <div className="pb-16">
      {/* Header Image */}
      <div className="relative w-full overflow-hiddenshadow-lg">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 sm:h-72 md:h-[400px] lg:h-[475px] object-cover transition-transform duration-500 hover:scale-105"
          />
        )}

        {/* ✅ Subtle Gradient Overlay for Better Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/40 shadow-md hover:bg-black/50 hover:scale-110 transition"
          title="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Link>

        {/* Edit/Delete Buttons for Owner */}
        {isOwner && (
          <div className="absolute top-4 right-4 flex gap-3">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md hover:bg-white/50 hover:scale-110 transition"
              title="Edit Blog"
            >
              <PencilSquareIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
            </Link>
            <button
              onClick={handleDeleteClick}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md hover:bg-white/50 hover:scale-110 transition"
              title="Delete Blog"
            >
              <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
            </button>
          </div>
        )}
      </div>


      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10">
          {/* Blog Title and Follow */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-6">
            {/* Blog Title & Author Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
                {blog.title}
              </h1>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-500">
                <span className="flex items-center">
                  ✍️ Created by{" "}
                  <Link
                    to={`/profile/${blog.author?._id}`}
                    className="ml-1 font-semibold text-gray-800 hover:text-blue-600 transition"
                  >
                    {blog.author?.username || "Unknown"}
                  </Link>
                </span>
                <span className="hidden sm:inline-block">•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Follow Button */}
            {user && !isOwner && blog.author && (
              <button
  onClick={handleFollowToggle}
  disabled={followLoading}
  className={`
    relative flex items-center justify-center
    gap-1 sm:gap-2 
    sm:px-6 sm:py-3 max-w-fit p-4
    rounded-full font-semibold 
    text-xs sm:text-sm md:text-base
    transition-all duration-300 transform
    hover:scale-105 active:scale-95
    ${
      isFollowing
        ? "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 shadow-md"
        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-blue-400/40 hover:from-indigo-500 hover:to-blue-600"
    }
    ${followLoading ? "opacity-70 cursor-not-allowed" : ""}
  `}
  style={{
    minWidth: "auto",
    boxShadow: isFollowing
      ? "inset 0 1px 3px rgba(0,0,0,0.1)"
      : "0 4px 14px rgba(59,130,246,0.4)",
  }}
>
  {followLoading ? (
    <span className="flex items-center">
      <svg
        className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
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
      <span className="hidden sm:inline ml-1">
        {isFollowing ? "Unfollowing" : "Following"}
      </span>
    </span>
  ) : (
    <>
      {isFollowing ? (
        <>
          <UserMinusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Following</span>
        </>
      ) : (
        <>
          <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Follow</span>
        </>
      )}
    </>
  )}
</button>



            )}
          </div>


          {/* Blog Content */}
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed font-normal text-justify whitespace-pre-line mb-8 sm:mb-10 tracking-wide">
            {blog.content}
          </p>

          {/* Stats Buttons */}
          <div className="flex flex-wrap gap-6 border-t border-gray-200 pt-5 items-center text-gray-700">
            {/* Like Button */}
            <button
              onClick={handleLikeToggle}
              disabled={likeLoading}
              className={`group flex items-center gap-2 px-4 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-300
      ${isLikedByUser
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${likeLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              title={isLikedByUser ? "Unlike" : "Like"}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-125">
                ❤️
              </span>
              <span>{blog.likes?.length || 0}</span>
              {likeLoading && <span className="ml-1 animate-pulse">...</span>}
            </button>

            {/* Views */}
            <span className="flex items-center gap-1 text-sm sm:text-base bg-gray-100 px-3 py-1.5 rounded-full shadow-sm">
              👁️ <span>{blog.views || 0}</span> Views
            </span>

            {/* Comments */}
            <span className="flex items-center gap-1 text-sm sm:text-base bg-gray-100 px-3 py-1.5 rounded-full shadow-sm">
              💬 <span>{blog.comments?.length || 0}</span> Comments
            </span>
          </div>

        </div>

        {/* Favorite Button */}
        <div className="mt-6 flex">
          <button
            onClick={handleFavoriteToggle}
            disabled={favLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95
      ${isFavorited
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
              } ${favLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <HeartIcon className="h-5 w-5" />
            {favLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              isFavorited ? "Favorited" : "Add to Favorites"
            )}
          </button>
        </div>


        {/* Comment Section */}
        <div className="mt-12 px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            💬 Comments
            <span className="text-sm font-medium text-gray-500">({blog.comments?.length || 0})</span>
          </h2>

          {/* Add Comment Form */}
          {user ? (
            <form
              onSubmit={handleCommentSubmit}
              className="mb-8 flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-5 py-3 shadow-md border border-gray-200"
            >
              <input
                type="text"
                placeholder="Write your comment..."
                className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </form>
          ) : (
            <p className="text-gray-500 text-sm sm:text-base mb-6 italic">
              Login to post a comment.
            </p>
          )}

          {/* Comments List */}
          <div className="max-h-96 overflow-y-auto space-y-5 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {blog.comments?.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                >
                  {/* Profile Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white font-bold text-lg flex items-center justify-center shadow-md">
                      {comment.user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800 text-base">
                        {comment.user?.username || "User"}
                      </h4>
                      <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base mt-1 leading-relaxed">
                      {comment.text || comment.comment}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <button className="hover:text-blue-500 transition">Reply</button>
                      <button className="hover:text-red-500 transition">Report</button>
                    </div>
                  </div>

                  {/* Emoji Reaction */}
                  <button
                    className="flex items-center justify-center text-gray-400 hover:text-yellow-500 transition transform hover:scale-125"
                    title="React"
                  >
                    😊
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center text-sm sm:text-base">No comments yet. Be the first one!</p>
            )}
          </div>
        </div>


      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ⚠️ Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


  );
}

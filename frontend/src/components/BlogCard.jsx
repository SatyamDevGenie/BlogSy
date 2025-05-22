import { Link } from "react-router-dom";
import {
  HeartIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] flex flex-col"
    >
      {/* Blog Image */}
      {blog.image ? (
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm rounded-t-2xl">
          No Image
        </div>
      )}

      {/* Blog Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Blog Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {blog.title}
        </h2>

        {/* Metadata */}
        <div className="text-xs text-gray-500 mb-4">
          <span>
            Created on - {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Blog Stats - Enhanced Styling */}
        <div className="mt-auto border-t pt-3 flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-red-500">❤️</span>
            <span>{blog.likes?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-blue-500">👁️</span>
            <span>{blog.views || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500">💬</span>
            <span>{blog.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

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
      className="group bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image */}
      {blog.image ? (
        <div className="h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-full h-40 sm:h-44 md:h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>

        {/* Meta Info */}
        <div className="text-xs text-gray-500 mb-4">
          <span>
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Footer Stats */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1 bg-red-50 text-red-500 px-2 py-1 rounded-full"
              title="Likes"
            >
              <HeartIcon className="w-4 h-4" />
              <span>{blog.likes?.length || 0}</span>
            </div>
            <div
              className="flex items-center gap-1 bg-blue-50 text-blue-500 px-2 py-1 rounded-full"
              title="Views"
            >
              <EyeIcon className="w-4 h-4" />
              <span>{blog.views || 0}</span>
            </div>
            <div
              className="flex items-center gap-1 bg-green-50 text-green-500 px-2 py-1 rounded-full"
              title="Comments"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span>{blog.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

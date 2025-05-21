import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group"
    >
      {/* Image */}
      {blog.image && (
        <div className="overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Title */}
      <div className="p-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {blog.title}
        </h2>

        {/* Author + Date */}
        <div className="text-xs text-gray-500 mt-1">
          {/* By <span className="font-medium">{blog.author?.username}</span> •{" "} */}
          Created on - {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        {/* Likes, Views, Comments */}
        <div className="flex justify-between items-center text-[11px] text-gray-500 mt-3">
          <span>❤️ {blog.likes?.length}</span>
          <span>👁️ {blog.views}</span>
          <span>💬 {blog.comments?.length}</span>
        </div>
      </div>
    </Link>
  );
}

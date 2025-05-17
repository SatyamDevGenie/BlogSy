import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-600 line-clamp-3">{blog.content}</p>

        {/* Author + Date */}
        <div className="text-sm text-gray-500 mt-3">
          By <span className="font-medium">{blog.author?.username}</span> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        {/* Likes, Views, Comments */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
          <span>❤️ {blog.likes?.length} Likes</span>
          <span>👁️ {blog.views} Views</span>
          <span>💬 {blog.comments?.length} Comments</span>
        </div>

        {/* Read More */}
        <div className="mt-4">
          <Link
            to={`/blogs/${blog._id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      className="group bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Section */}
      {blog.image ? (
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>

          {/* Category Tag */}
          <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-900 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
            {blog.category || "BlogSy"}
          </span>
        </div>
      ) : (
        <div className="h-48 md:h-56 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
          No Image Available
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {blog.title}
        </h2>

        {/* Author & Date */}
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            👤 {blog.author?.username || "Unknown"}
          </span>
          •
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </p>

        {/* Description (Snippet) */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.content.slice(0, 80)}...
        </p>

        {/* Stats Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
          <div className="flex gap-3">
            {/* Likes */}
            <div
              className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded-full font-medium text-xs transition"
              title="Likes"
            >
              <HeartIcon className="w-4 h-4" />
              <span>{blog.likes?.length || 0}</span>
            </div>
            {/* Views */}
            <div
              className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded-full font-medium text-xs transition"
              title="Views"
            >
              <EyeIcon className="w-4 h-4" />
              <span>{blog.views || 0}</span>
            </div>
            {/* Comments */}
            <div
              className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-600 px-2 py-1 rounded-full font-medium text-xs transition"
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




// import { Link } from "react-router-dom";
// import {
//   HeartIcon,
//   EyeIcon,
//   ChatBubbleLeftIcon,
// } from "@heroicons/react/24/solid";

// export default function BlogCard({ blog }) {
//   return (
//     <Link
//       to={`/blogs/${blog._id}`}
//       className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1 hover:scale-[1.01]"
//     >
//       {/* Image */}
//       {blog.image ? (
//         <div className="h-44 md:h-52 overflow-hidden relative">
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
//         </div>
//       ) : (
//         <div className="w-full h-44 md:h-52 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
//           No Image Available
//         </div>
//       )}

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-grow">
//         {/* Title */}
//         <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
//           {blog.title}
//         </h2>

//         {/* Meta Info */}
//         <p className="text-xs text-gray-500 mb-4">
//           Published on{" "}
//           <span className="font-medium">
//             {new Date(blog.createdAt).toLocaleDateString()}
//           </span>
//         </p>

//         {/* Footer Stats */}
//         <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-600">
//           <div className="flex items-center gap-2 flex-wrap">
//             <div
//               className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium text-xs"
//               title="Likes"
//             >
//               <HeartIcon className="w-4 h-4" />
//               <span>{blog.likes?.length || 0}</span>
//             </div>
//             <div
//               className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium text-xs"
//               title="Views"
//             >
//               <EyeIcon className="w-4 h-4" />
//               <span>{blog.views || 0}</span>
//             </div>
//             <div
//               className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium text-xs"
//               title="Comments"
//             >
//               <ChatBubbleLeftIcon className="w-4 h-4" />
//               <span>{blog.comments?.length || 0}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

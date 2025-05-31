import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import About from "./About";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <About />

      {/* Action Buttons */}
      <div className="flex flex-row sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 py-8 sm:py-12">
        {/* Trending Blogs Button */}
        <Link
          to="/trending"
          className="group w-full sm:w-48 flex justify-center items-center gap-2 px-5 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md hover:from-purple-600 hover:to-red-600 transition-all duration-300 active:scale-95"
        >
          <span className="text-lg group-hover:animate-bounce">🔥</span>
          <span className="font-medium">Trending Blogs</span>
        </Link>

        {/* Create Blog Button */}
        <Link
          to="/createBlog"
          className="group w-full sm:w-48 flex justify-center items-center gap-2 px-5 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 active:scale-95"
        >
          <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
            +
          </span>
          <span className="font-medium">Create Blog</span>
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 mt-3 min-h-[60vh]">
        {isLoading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading blogs...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">{message}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="transform transition duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.5s ease ${index * 100}ms both`,
                }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

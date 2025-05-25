import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import About from "./About";
import { Link } from "react-router-dom"; // Link for navigation

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
      <section className="text-center py-16 px-4 shadow-inner">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight animate-fade-in">
          Discover our inspiring blogs & ideas ✨
        </h1>
        <p className="text-md text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-150">
          Dive into fresh perspectives, valuable insights, and creative voices
          from our vibrant writing community blogs.
        </p>
      </section>

      {/* Create & Trending Blog Buttons */}
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 mt-8">
        {/* Trending Blogs Button - left corner */}
        <Link
          to="/trending"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-red-600 active:scale-95"
        >
          <span className="text-lg group-hover:animate-bounce">🔥</span>
          <span className="font-medium">Trending Blogs</span>
          <span className="absolute inset-0 rounded-full ring-2 ring-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
        </Link>

        {/* Create Blog Button - right corner */}
        <Link
          to="/createBlog"
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg transition-all duration-300 ease-in-out hover:from-blue-700 hover:to-cyan-600 active:scale-95"
        >
          <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
            +
          </span>
          <span className="font-medium">Create Blog</span>
          <span className="absolute inset-0 rounded-full ring-2 ring-white opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="px-2 sm:px-4 md:px-6 py-10 min-h-[60vh] mt-3">
        {isLoading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading blogs...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">{message}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 animate-fade-in">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className="transition duration-300 transform hover:scale-105"
                style={{
                  animation: `fadeInUp 0.5s ease ${index * 100}ms both`,
                }}
              >
                <div className="scale-90">
                  <BlogCard blog={blog} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* About Section Rendered */}
      <About />
    </>
  );
}

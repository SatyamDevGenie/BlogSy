import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
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

      {/* Create Blog Button */}
      <div className="flex justify-end px-4 sm:px-6 md:px-10 mt-8">
        <Link
          to="/createBlog"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out text-sm sm:text-base"
        >
          <span className="text-lg font-medium">+</span>
          <span>Create Blog</span>
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
    </>
  );
}

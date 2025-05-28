import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestBlogs, resetBlog } from "../features/blog/blogSlice";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

const LatestBlogPage = () => {
  const dispatch = useDispatch();

  const { latestBlogs, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(fetchLatestBlogs());

    return () => {
      dispatch(resetBlog());
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight animate-fade-in">
          🆕 Latest Blogs
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-150">
          Discover the newest blogs published by our amazing community.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
        {isLoading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading latest blogs...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">Error: {message}</p>
        ) : latestBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No latest blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {latestBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="transition duration-300 transform hover:scale-105"
                style={{
                  animation: `fadeInUp 0.5s ease ${index * 100}ms both`,
                }}
              >
                <div className="scale-95 sm:scale-100">
                  <BlogCard blog={blog} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LatestBlogPage;

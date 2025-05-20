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
      <div className="py-10 px-4 text-black text-center shadow-md bg-white">
        <h1 className="text-3xl sm:text-2xl font-semibold drop-shadow mb-3 animate-fade-in">
          Discovering our Latest Inspiring Blogs ✨
        </h1>
        <p className="text-base sm:text-1xl text-gray-600 max-w-xl mx-auto font-medium">
          Explore our latest thoughts, stories, ideas and blogs from our amazing
          community of writers.
        </p>
      </div>

      {/* Create Blog Button */}
      <div className="flex justify-end px-4 sm:px-6 md:px-10 mt-6">
        <Link
          to="/create-blog"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out text-sm sm:text-base"
        >
          <span className="text-lg font-bold">+</span>
          <span>Create Blog</span>
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 md:px-10 py-12 min-h-screen mt-5">
        {isLoading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading blogs...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">{message}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-up">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className={`transition transform duration-500 ease-in-out animate-fade-up delay-[${
                  index * 100
                }ms]`}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

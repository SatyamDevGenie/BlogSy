import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="py-10 px-4 text-black text-center shadow-md bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold drop-shadow mb-3 animate-fade-in">
          Discover Our Latest Inspiring Blogs ✨
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-medium">
          Explore the latest thoughts, stories & ideas from our amazing community of writers.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="px-4 sm:px-6 md:px-10 py-10 bg-gray-100 min-h-screen">
        {isLoading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading blogs...</p>
        ) : isError ? (
          <p className="text-center text-red-500">{message}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-up">
            {blogs.map((blog, index) => (
              <div
                key={blog._id}
                className={`transition transform duration-500 ease-in-out animate-fade-up delay-[${index * 100}ms]`}
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

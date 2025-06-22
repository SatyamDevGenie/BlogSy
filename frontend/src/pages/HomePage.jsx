import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import About from "./About";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <About />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-row sm:flex-row justify-center items-center gap-4 sm:gap-6 px-4 py-4 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/trending"
            className="group w-full sm:w-48 flex justify-center items-center gap-2 px-5 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md hover:from-purple-600 hover:to-red-600 transition-all duration-300"
          >
            <span className="text-lg group-hover:animate-bounce">🔥</span>
            <span className="font-medium">Trending Blogs</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/createBlog"
            className="group w-full sm:w-48 flex justify-center items-center gap-2 px-5 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
          >
            <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            <span className="font-medium">Create Blog</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 mt-3 min-h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="transform transition duration-300 hover:scale-105"
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <Footer />
    </>
  );
}

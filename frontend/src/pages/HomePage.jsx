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

  // Motion Variants for Stagger Effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />

      {/* Hero/About Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <About />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4 py-6 sm:py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/trending"
            className="group flex justify-center items-center gap-2 px-6 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md hover:shadow-lg hover:from-purple-600 hover:to-red-600 transition-all duration-300"
          >
            <span className="text-lg group-hover:animate-bounce">🔥</span>
            <span className="font-semibold">Trending Blogs</span>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/createBlog"
            className="group flex justify-center items-center gap-2 px-6 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
          >
            <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            <span className="font-semibold">Create Blog</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Blog Grid Section */}
      <motion.div
        className="px-4 sm:px-6 md:px-8 py-10 sm:py-12 mt-3 min-h-[60vh]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {isLoading ? (
          // ✅ Skeleton Loader for better UX
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg h-48"
              ></div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">{message}</p>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <img
              src="/empty-state.svg"
              alt="No blogs"
              className="w-52 mb-4 opacity-80"
            />
            <p>No blogs found. Start creating your first blog!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                variants={itemVariants}
                className="hover:scale-105 transform transition duration-300"
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

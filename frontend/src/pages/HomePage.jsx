import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import About from "./About";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function HomePage() {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blog
  );

  // ✅ Search state (for blog title only)
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // ✅ Debounce search for performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(searchTitle);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTitle]);

  // ✅ Apply Filters + Sorting
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesTitle = blog.title
        .toLowerCase()
        .includes(debouncedTitle.toLowerCase());

      const matchesCategory = category === "All" || blog.category === category;

      return matchesTitle && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortOrder === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortOrder === "Popular" || sortOrder === "Trending") {
        return b.likes - a.likes;
      }
      return 0;
    });

  // Motion Variants
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

      {/* Search + Filters */}
      <motion.div
        className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 px-4 py-6 sm:py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ✅ Search Bar for Blog Title */}
        <motion.div className="relative w-full sm:w-80" variants={itemVariants}>
          <input
            type="text"
            placeholder="Search your blogs....................."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
        </motion.div>

        {/* ✅ Category Filter */}
        <motion.select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm"
          variants={itemVariants}
        >
          <option value="All">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
        </motion.select>

        {/* ✅ Sort Filter */}
        <motion.select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-pink-500 text-gray-700 shadow-sm"
          variants={itemVariants}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </motion.select>

        {/* ✅ Buttons Section */}
        <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
          {/* Create Blog Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

          {/* Trending Button */}
          <Link to="/trending">
          <motion.button
            onClick={() => setSortOrder("Trending")}
            className={`px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
              sortOrder === "Trending"
                ? "bg-gradient-to-r from-pink-500 to-red-500"
                : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔥 Trending
          </motion.button>
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
          // ✅ Skeleton Loader
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
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <img
              src="/empty-state.svg"
              alt="No blogs"
              className="w-52 mb-4 opacity-80"
            />
            <p>No blogs found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={itemVariants}
                className="hover:scale-105 transform transition duration-300 relative"
              >
                {/* Show Trending Label if Trending is selected */}
                {sortOrder === "Trending" && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    🔥 Trending
                  </span>
                )}
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







// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogs } from "../features/blog/blogSlice";
// import BlogCard from "../components/BlogCard";
// import Navbar from "../components/Navbar";
// import About from "./About";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";
// import { FaSearch } from "react-icons/fa"; // ✅ Added Search Icon

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { blogs, isLoading, isError, message } = useSelector(
//     (state) => state.blog
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");

//   useEffect(() => {
//     dispatch(fetchBlogs());
//   }, [dispatch]);

//   // ✅ Debounce Search
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchTerm]);

//   // ✅ Apply Filters + Sorting
//   const filteredBlogs = blogs
//     .filter((blog) => {
//       const matchesSearch =
//         blog.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         blog.content.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         blog.author?.toLowerCase().includes(debouncedSearch.toLowerCase());

//       const matchesCategory = category === "All" || blog.category === category;

//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       if (sortOrder === "Newest") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//       if (sortOrder === "Oldest") {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
//       if (sortOrder === "Popular" || sortOrder === "Trending") {
//         return b.likes - a.likes; // Sort by likes
//       }
//       return 0;
//     });

//   // Motion Variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Hero/About Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <About />
//       </motion.div>

//       {/* Search + Filters */}
//       <motion.div
//         className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 px-4 py-6 sm:py-10"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* ✅ Search Bar with Icon */}
//         <motion.div className="relative w-full sm:w-80" variants={itemVariants}>
//           <input
//             type="text"
//             placeholder="Search blogs by title, author or content..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm"
//           />
//           <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             <FaSearch />
//           </span>
//         </motion.div>

//         {/* ✅ Category Filter */}
//         <motion.select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm"
//           variants={itemVariants}
//         >
//           <option value="All">All Categories</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//           <option value="Travel">Travel</option>
//           <option value="Education">Education</option>
//         </motion.select>

//         {/* ✅ Sort Filter */}
//         <motion.select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-pink-500 text-gray-700 shadow-sm"
//           variants={itemVariants}
//         >
//           <option value="Newest">Newest</option>
//           <option value="Oldest">Oldest</option>
//         </motion.select>

//         {/* ✅ Buttons Section */}
//         <motion.div className="flex flex-wrap gap-3" variants={itemVariants}>
//           {/* Create Blog Button */}
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Link
//               to="/createBlog"
//               className="group flex justify-center items-center gap-2 px-6 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
//             >
//               <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
//                 +
//               </span>
//               <span className="font-semibold">Create Blog</span>
//             </Link>
//           </motion.div>

//           {/* Trending Button */}
//           <Link to="/trending">
//           <motion.button
//             onClick={() => setSortOrder("Trending")}
//             className={`px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
//               sortOrder === "Trending"
//                 ? "bg-gradient-to-r from-pink-500 to-red-500"
//                 : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
//             }`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             🔥 Trending
//           </motion.button>
//           </Link>
//         </motion.div>
//       </motion.div>

//       {/* Blog Grid Section */}
//       <motion.div
//         className="px-4 sm:px-6 md:px-8 py-10 sm:py-12 mt-3 min-h-[60vh]"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {isLoading ? (
//           // ✅ Skeleton Loader
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 animate-pulse rounded-lg h-48"
//               ></div>
//             ))}
//           </div>
//         ) : isError ? (
//           <p className="text-center text-red-500">{message}</p>
//         ) : filteredBlogs.length === 0 ? (
//           <div className="flex flex-col items-center justify-center text-gray-500">
//             <img
//               src="/empty-state.svg"
//               alt="No blogs"
//               className="w-52 mb-4 opacity-80"
//             />
//             <p>No blogs found matching your filters.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredBlogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 variants={itemVariants}
//                 className="hover:scale-105 transform transition duration-300 relative"
//               >
//                 {/* Show Trending Label if Trending is selected */}
//                 {sortOrder === "Trending" && (
//                   <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     🔥 Trending
//                   </span>
//                 )}
//                 <BlogCard blog={blog} />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       <Footer />
//     </>
//   );
// }







// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBlogs } from "../features/blog/blogSlice";
// import BlogCard from "../components/BlogCard";
// import Navbar from "../components/Navbar";
// import About from "./About";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import { motion } from "framer-motion";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { blogs, isLoading, isError, message } = useSelector(
//     (state) => state.blog
//   );

//   useEffect(() => {
//     dispatch(fetchBlogs());
//   }, [dispatch]);

//   // Motion Variants for Stagger Effect
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Hero/About Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <About />
//       </motion.div>

//       {/* Action Buttons */}
//       <motion.div
//         className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4 py-6 sm:py-10"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         <motion.div
//           variants={itemVariants}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Link
//             to="/trending"
//             className="group flex justify-center items-center gap-2 px-6 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-md hover:shadow-lg hover:from-purple-600 hover:to-red-600 transition-all duration-300"
//           >
//             <span className="text-lg group-hover:animate-bounce">🔥</span>
//             <span className="font-semibold">Trending Blogs</span>
//           </Link>
//         </motion.div>

//         <motion.div
//           variants={itemVariants}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Link
//             to="/createBlog"
//             className="group flex justify-center items-center gap-2 px-6 py-3 rounded-full text-white text-sm sm:text-base bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
//           >
//             <span className="text-xl font-bold group-hover:rotate-90 transition-transform duration-300">
//               +
//             </span>
//             <span className="font-semibold">Create Blog</span>
//           </Link>
//         </motion.div>
//       </motion.div>

//       {/* Blog Grid Section */}
//       <motion.div
//         className="px-4 sm:px-6 md:px-8 py-10 sm:py-12 mt-3 min-h-[60vh]"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >

//         {isLoading ? (
//           // ✅ Skeleton Loader for better UX
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 animate-pulse rounded-lg h-48"
//               ></div>
//             ))}
//           </div>
//         ) : isError ? (
//           <p className="text-center text-red-500">{message}</p>
//         ) : blogs.length === 0 ? (
//           <div className="flex flex-col items-center justify-center text-gray-500">
//             <img
//               src="/empty-state.svg"
//               alt="No blogs"
//               className="w-52 mb-4 opacity-80"
//             />
//             <p>No blogs found. Start creating your first blog!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {blogs.map((blog, index) => (
//               <motion.div
//                 key={blog._id}
//                 variants={itemVariants}
//                 className="hover:scale-105 transform transition duration-300"
//               >
//                 <BlogCard blog={blog} />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       <Footer />
//     </>
//   );
// }

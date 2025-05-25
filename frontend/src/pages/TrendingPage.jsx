import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

export default function TrendingPage() {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/trending");
        setTrendingBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch trending blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []);

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="text-center py-16 px-4 shadow-inner">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight animate-fade-in">
          🔥 Trending Blogs
        </h1>
        <p className="text-md text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-150">
          Explore the most viewed blogs curated by our community.
        </p>
      </section>

      {/* Blog Grid */}
      <div className="px-4 py-10 min-h-[60vh]">
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading trending blogs...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : trendingBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No trending blogs found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
            {trendingBlogs.map((blog, index) => (
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

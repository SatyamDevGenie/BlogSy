// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12 mt-16 bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 tracking-tight leading-snug">
        About <span className="text-blue-600">BlogSy</span>
      </h1>

      <motion.p
        className="text-gray-800 text-lg leading-relaxed mb-8 font-medium"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome to <span className="font-semibold text-blue-600">BlogSy</span> —
        your go-to platform for seamless blogging and content sharing. Our
        mission is to empower creators and readers alike by providing a
        distraction-free, user-friendly environment where creativity thrives and
        ideas flow effortlessly.
      </motion.p>

      <motion.p
        className="text-gray-800 text-lg leading-relaxed mb-8 font-medium"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        At <span className="font-semibold text-blue-600">BlogSy</span>, we
        prioritize a refined user experience with features like customizable
        profiles, streamlined post creation, and meaningful community
        interaction. Whether you're an experienced blogger or taking your first
        steps, BlogSy is crafted to support your journey every step of the way.
      </motion.p>

      <motion.p
        className="text-gray-800 text-lg leading-relaxed font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Join us in shaping a vibrant digital space where inspiration is shared,
        knowledge is expanded, and voices are heard. Thank you for being a part
        of <span className="font-semibold text-blue-600">BlogSy</span> —{" "}
        <span className="italic text-gray-700">
          Systems & Services dedicated to your blogging success.
        </span>
      </motion.p>
    </motion.div>
  );
}

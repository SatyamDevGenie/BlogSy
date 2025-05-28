// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 mt-10 sm:mt-16 bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 tracking-tight leading-snug text-center sm:text-left">
        About <span className="text-blue-600">BlogSy</span>
      </h1>

      <motion.p
        className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium text-justify"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome to <span className="font-semibold text-blue-600">BlogSy</span> —
        your go-to platform for seamless blogging and content sharing. Our mission
        is to empower creators and readers alike by providing a distraction-free,
        user-friendly environment where creativity thrives and ideas flow effortlessly.
      </motion.p>

      <motion.p
        className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium text-justify"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        At <span className="font-semibold text-blue-600">BlogSy</span>, we
        prioritize a refined user experience with features like customizable
        profiles, streamlined post creation, and meaningful community interaction.
        Whether you're an experienced blogger or taking your first steps,
        BlogSy is crafted to support your journey every step of the way.
      </motion.p>

      <motion.p
        className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium text-justify"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Join us in shaping a vibrant digital space where inspiration is shared,
        knowledge is expanded, and voices are heard. Thank you for being a part of{" "}
        <span className="font-semibold text-blue-600">BlogSy</span> —{" "}
        <span className="italic text-gray-700">
          Systems & Services dedicated to your blogging success.
        </span>
      </motion.p>
    </motion.div>
  );
}

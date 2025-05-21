// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-10 mt-16 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold mb-8 text-black tracking-wide">
        About BlogSy
      </h1>
      <motion.p
        className="text-gray-700 leading-relaxed mb-6 text-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome to <span className="font-semibold text-blue-600">BlogSy</span> —
        your go-to platform for seamless blogging and content sharing. Our
        mission is to empower creators and readers alike by providing a clean,
        user-friendly space where ideas can flow freely.
      </motion.p>
      <motion.p
        className="text-gray-700 leading-relaxed mb-6 text-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        At BlogSy, we focus on delivering an intuitive experience with features
        like personalized profiles, easy post creation, and community
        engagement. Whether you are a seasoned blogger or just starting out,
        BlogSy is designed to help you connect, share, and grow your audience.
      </motion.p>
      <motion.p
        className="text-gray-700 leading-relaxed text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Join us in creating a vibrant community where stories inspire and
        knowledge spreads. Thank you for choosing BlogSy — Systems & Services
        dedicated to your blogging success.
      </motion.p>
    </motion.div>
  );
}

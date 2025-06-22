// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 mt-12 sm:mt-20 bg-white text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-snug">
        Inspiring thoughts,&nbsp;
        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          empowering voices
        </span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        <span className="font-semibold text-gray-800">BlogSy 2025</span> — where
        stories spark ideas and voices inspire change.
      </p>
    </motion.section>
  );
}

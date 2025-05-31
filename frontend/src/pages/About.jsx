// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 mt-12 sm:mt-20 bg-white text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Heading */}
      <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-tight mt-6">
        Inspiring thoughts,&nbsp;
        <span className="text-blue-600">empowering voices</span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
        Discovering the stories, experiences, and ideas shared by our community.
        Whether you're here to read, write, or be inspired — BlogSy 2025 is your
        space to shine.
      </p>
    </motion.section>
  );
}

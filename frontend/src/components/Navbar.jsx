// components/Navbar.jsx
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { motion } from "framer-motion";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.nav
      className="bg-white shadow-md p-4 flex items-center justify-between"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {/* Simple Logo */}
      <Link to="/" className="text-3xl font-semibold text-black">
        BlogSy
      </Link>

      {/* Nav links & user actions */}
      <div className="flex items-center space-x-6">
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
        >
          About Us
        </Link>

        {user && (
          <>
            {/* Profile icon */}
            <Link
              to="/profile"
              className="relative text-gray-700 hover:text-blue-600 transition duration-200"
            >
              <FaUserCircle className="text-2xl" />
              <span className="absolute -top-1 -right-4 bg-blue-600 text-white text-xs px-1 rounded">
                {user.username}
              </span>
            </Link>

            {/* Animated Logout button */}
            <motion.button
              onClick={() => dispatch(logout())}
              className="flex items-center space-x-2 px-5 py-2 bg-red-500 text-white rounded-full shadow-lg focus:outline-none"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 15px rgba(239,68,68,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.button>
          </>
        )}
      </div>
    </motion.nav>
  );
}

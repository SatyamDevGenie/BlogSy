import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 px-6 py-3 bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-3xl font-extrabold text-black">
            BlogSy
          </span>
          <span className="text-xs text-indigo-400 tracking-wide ml-1">
            Explore your blogs 2025
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              to="/latest"
              className="text-gray-700 font-medium text-base relative after:absolute after:w-0 after:h-[2px] after:bg-indigo-500 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:text-indigo-600"
            >
              Latest Blogs
            </Link>
          </motion.div>

          {user ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition"
                >
                  <FaUserCircle className="text-xl" />
                  <span>{user.username}</span>
                </Link>
              </motion.div>

              <motion.button
                onClick={() => dispatch(logout())}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="px-5 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-2xl px-6 py-8 flex flex-col gap-6 rounded-b-2xl z-40"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="/latest"
                onClick={toggleMobileMenu}
                className="text-gray-800 text-lg font-semibold hover:text-indigo-500 hover:drop-shadow-md transition duration-200"
              >
                Latest Blogs
              </Link>
            </motion.div>

            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to="/profile"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-2 text-gray-800 hover:text-indigo-500 hover:drop-shadow-md font-semibold transition duration-200"
                  >
                    <FaUserCircle className="text-xl" />
                    <span>{user.username}</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <button
                    onClick={() => {
                      dispatch(logout());
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition duration-200"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold shadow-md"
                >
                  Get Started
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}





// import { Link } from 'react-router-dom';
// import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../features/auth/authSlice';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const menuRef = useRef();

//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setIsMobileMenuOpen(false);
//       }
//     };
//     if (isMobileMenuOpen) {
//       document.addEventListener('mousedown', handler);
//     }
//     return () => document.removeEventListener('mousedown', handler);
//   }, [isMobileMenuOpen]);

//   return (
//     <motion.nav
//       className="bg-white shadow-sm px-6 py-3 fixed top-0 left-0 w-full z-50"
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex flex-col leading-tight">
//           <span className="text-3xl font-bold text-gray-900">BlogSy</span>
//           <span className="text-xs text-blue-300 tracking-wide ml-3">Explore your blogs</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/latest"
//             className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
//           >
//             Latest Blogs
//           </Link>

//           {user ? (
//             <>
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
//               >
//                 <FaUserCircle className="text-xl" />
//                 <span>{user.username}</span>
//               </Link>
//               <motion.button
//                 onClick={() => dispatch(logout())}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </motion.button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
//             >
//               Get Started
//             </Link>
//           )}
//         </div>

//         {/* Hamburger Icon */}
//         <button
//           onClick={toggleMobileMenu}
//           className="md:hidden text-2xl text-gray-800 focus:outline-none"
//         >
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             ref={menuRef}
//             className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 px-6 py-6 flex flex-col gap-4 z-40"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Link
//               to="/latest"
//               onClick={toggleMobileMenu}
//               className="text-gray-800 text-base hover:text-blue-600 font-medium"
//             >
//               Latest Blogs
//             </Link>

//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   onClick={toggleMobileMenu}
//                   className="flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium"
//                 >
//                   <FaUserCircle className="text-xl" />
//                   <span>{user.username}</span>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     dispatch(logout());
//                     toggleMobileMenu();
//                   }}
//                   className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
//                 >
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={toggleMobileMenu}
//                 className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium"
//               >
//                 Get Started
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }




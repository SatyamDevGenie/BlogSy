import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <motion.nav
      className='bg-white px-6 py-4 fixed w-full z-50 top-0 left-0'
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        {/* Logo */}
        <Link to='/' className='flex flex-col leading-tight'>
          <span className='text-2xl font-bold text-gray-900'>BlogSy</span>
          <span className='text-sm text-gray-500 tracking-wide'>
            Explore your blogs 
          </span>
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMobileMenu}
          className='md:hidden text-2xl text-gray-800 focus:outline-none'
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-8'>
          <Link
            to='/latest'
            className='text-gray-700 font-medium hover:text-blue-600 transition duration-200'
          >
            Latest Blogs
          </Link>

          {user && (
            <>
              <Link
                to='/profile'
                className='relative flex items-center gap-1 text-gray-700 hover:text-blue-600 transition'
              >
                <FaUserCircle className='text-xl' />
                <span>{user.username}</span>
              </Link>

              <motion.button
                onClick={() => dispatch(logout())}
                className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='md:hidden bg-white border-t border-gray-200 flex flex-col items-center gap-6 py-6 mt-4 shadow-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to='/latest'
              onClick={toggleMobileMenu}
              className='text-gray-800 text-base hover:text-blue-600 font-medium'
            >
              Latest Blogs
            </Link>

            {user && (
              <>
                <Link
                  to='/profile'
                  onClick={toggleMobileMenu}
                  className='flex items-center gap-2 text-gray-800 hover:text-blue-600 font-medium'
                >
                  <FaUserCircle className='text-xl' />
                  <span>{user.username}</span>
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout());
                    toggleMobileMenu();
                  }}
                  className='flex items-center gap-2 text-red-500 hover:text-red-600 font-medium'
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}




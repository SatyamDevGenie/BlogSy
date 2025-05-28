import { Link } from 'react-router-dom'
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Navbar () {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

  return (
    <motion.nav
      className='bg-white shadow-md p-4 flex items-center justify-between relative z-50'
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      {/* Logo */}
      <Link to='/' className='text-3xl font-bold text-black'>
        BlogSy
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className='md:hidden'>
        <button onClick={toggleMobileMenu} className='text-2xl text-gray-700'>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex items-center space-x-12'>
        <Link
          to='/latest'
          className='group inline-flex items-center gap-2 px-5 mr-5 py-2.5 rounded-full text-white bg-gray-800'
        >
          Latest Blogs
        </Link>

        {user && (
          <>
            <Link
              to='/profile'
              className='relative text-gray-700 hover:text-blue-600 transition duration-200'
            >
              <FaUserCircle className='text-2xl' />
              <span className='absolute -top-1 -right-4 bg-blue-600 text-white text-xs px-1 rounded'>
                {user.username}
              </span>
            </Link>

            <motion.button
              onClick={() => dispatch(logout())}
              className='flex items-center space-x-2 px-5 py-2 bg-red-500 text-white rounded-full shadow-lg focus:outline-none'
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(239,68,68,0.7)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='absolute top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center space-y-4 py-6 md:hidden shadow-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to='/latest'
              onClick={toggleMobileMenu}
              className='text-gray-800 hover:text-blue-600 font-medium'
            >
              Latest Blogs
            </Link>

            {user && (
              <>
                <Link
                  to='/profile'
                  onClick={toggleMobileMenu}
                  className='flex items-center gap-2 text-gray-700 hover:text-blue-600'
                >
                  <FaUserCircle className='text-xl' />
                  <span>{user.username}</span>
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout())
                    toggleMobileMenu()
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
  )
}






// // components/Navbar.jsx
// import { Link } from 'react-router-dom'
// import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../features/auth/authSlice'
// import { motion } from 'framer-motion'

// export default function Navbar () {
//   const dispatch = useDispatch()
//   const { user } = useSelector(state => state.auth)

//   return (
//     <motion.nav
//       className='bg-white shadow-md p-4 flex items-center justify-between'
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: 'spring', stiffness: 120, damping: 20 }}
//     >
//       {/* Simple Logo */}
//       <Link to='/' className='text-3xl font-bold text-black'>
//         BlogSy
//       </Link>

//       {/* Nav links & user actions */}
//       <div className='flex items-center space-x-12'>
//         <Link
//           to='/latest'
//           className='group relative mr-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-gray-500 via-gray-3300 to-gray-900 shadow-lg transition-all duration-300 ease-in-out hover:from-gray-600 hover:to-gray-800 active:scale-95'
//         >
//           Latest Blogs
//         </Link>

//         {user && (
//           <>
//             {/* Profile icon */}
//             <Link
//               to='/profile'
//               className='relative text-gray-700 hover:text-blue-600 transition duration-200'
//             >
//               <FaUserCircle className='text-2xl' />
//               <span className='absolute -top-1 -right-4 bg-blue-600 text-white text-xs px-1 rounded'>
//                 {user.username}
//               </span>
//             </Link>

//             {/* Animated Logout button */}
//             <motion.button
//               onClick={() => dispatch(logout())}
//               className='flex items-center space-x-2 px-5 py-2 bg-red-500 text-white rounded-full shadow-lg focus:outline-none'
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: '0px 0px 15px rgba(239,68,68,0.7)'
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <FaSignOutAlt />
//               <span>Logout</span>
//             </motion.button>
//           </>
//         )}
//       </div>
//     </motion.nav>
//   )
// }

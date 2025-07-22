import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UserIcon,
  MailIcon,
  HeartIcon,
  FileTextIcon,
  UsersIcon,
  UserPlusIcon,
  PencilIcon,
  HomeIcon,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get("/api/users/profile", config);
      setProfile(data.user);
      setBlogs(data.blogs);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Login required");
      return;
    }
    fetchProfile();
  }, [token]);

  const handleRemoveFromFavourites = async (blogId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/users/favourites/${blogId}`, config);
      fetchProfile();
    } catch (err) {
      alert("Failed to remove from favourites");
    }
  };

  const handleEditProfile = () => navigate("/updateProfile");
  const handleBlogClick = (id) => navigate(`/blogs/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600 font-medium">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-600 font-semibold text-lg">
        {error}
      </p>
    );
  }

  if (!profile) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 px-4 sm:px-8 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Back to Home Button */}
      <div className="max-w-6xl mx-auto flex items-center mb-6">
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/90 border border-gray-200 rounded-xl shadow hover:shadow-xl text-gray-700 hover:text-indigo-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <HomeIcon className="w-5 h-5 text-indigo-600" />
          Home
        </motion.button>
      </div>

      {/* ✅ Profile Header */}
      <motion.div
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center border border-indigo-100"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Profile Image with Gradient Ring */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <span className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-4">
          {profile.username}
        </h1>
        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
          <MailIcon className="w-4 h-4" /> {profile.email}
        </p>

        {/* Edit Button */}
        <motion.button
          onClick={handleEditProfile}
          className="mt-6 px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
          whileHover={{ scale: 1.08 }}
        >
          <PencilIcon className="w-4 h-4" />
          Edit Profile
        </motion.button>
      </motion.div>

      {/* ✅ Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { icon: UsersIcon, label: "Followers", count: profile.followers?.length || 0, color: "green" },
          { icon: UserPlusIcon, label: "Following", count: profile.following?.length || 0, color: "indigo" },
          { icon: FileTextIcon, label: "My Blogs", count: blogs.length, color: "pink" },
        ].map(({ icon: Icon, label, count, color }, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 shadow-lg p-6 text-center hover:shadow-xl transition group"
          >
            <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center mx-auto mb-3`}>
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
            <p className="text-2xl font-extrabold text-gray-900">{count}</p>
          </div>
        ))}
      </motion.div>

      {/* ✅ Favourite Blogs Section */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
          <HeartIcon className="w-6 h-6" />
          Favourite Blogs
        </h2>
        {profile.favourites.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.favourites.map((fav) => (
              <motion.div
                key={fav._id}
                className="bg-white rounded-2xl shadow-xl p-4 hover:shadow-2xl transition relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
              >
                <div onClick={() => handleBlogClick(fav._id)} className="cursor-pointer">
                  <h3 className="text-lg font-semibold text-slate-800 truncate">
                    {fav.title}
                  </h3>
                  <p className="text-pink-700 text-sm mt-1">by {fav.author.username}</p>
                </div>
                <button
                  className="absolute top-4 right-4 text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                  onClick={() => handleRemoveFromFavourites(fav._id)}
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favourites yet.</p>
        )}
      </section>

      {/* ✅ My Blogs Section */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
          <FileTextIcon className="w-6 h-6" />
          My Blogs
        </h2>
        {blogs.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleBlogClick(blog._id)}
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 truncate">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{blog.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't written any blogs yet.</p>
        )}
      </section>
    </motion.div>
  );
}







// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   UserIcon,
//   MailIcon,
//   HeartIcon,
//   FileTextIcon,
//   UsersIcon,
//   UserPlusIcon,
//   PencilIcon,
//   HomeIcon,
// } from "lucide-react";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const token = user?.token;

//   const [profile, setProfile] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch Profile Data
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const { data } = await axios.get("/api/users/profile", config);
//       setProfile(data.user);
//       setBlogs(data.blogs);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       setLoading(false);
//       setError("Login required");
//       return;
//     }
//     fetchProfile();
//   }, [token]);

//   // ✅ Handlers
//   const handleRemoveFromFavourites = async (blogId) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.delete(`/api/users/favourites/${blogId}`, config);
//       fetchProfile();
//     } catch (err) {
//       alert("Failed to remove from favourites");
//     }
//   };

//   const handleEditProfile = () => navigate("/updateProfile");
//   const handleBlogClick = (id) => navigate(`/blogs/${id}`);

//   // ✅ Animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // ✅ Loading State
//   if (loading) {
//     return (
//       <div className="p-8 text-center text-gray-600 text-lg font-medium">
//         Loading profile...
//       </div>
//     );
//   }

//   // ✅ Error State
//   if (error) {
//     return (
//       <p className="p-8 text-center text-red-600 font-semibold text-lg">
//         {error}
//       </p>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <motion.div
//       className="max-w-6xl mx-auto px-4 sm:px-6 py-6 mt-6 sm:mt-12 bg-gradient-to-tr from-white via-slate-100 to-white rounded-xl shadow-xl space-y-10"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* ✅ Back Button */}
//       <div className="flex items-center mb-6">
//         <motion.button
//           onClick={() => navigate("/")}
//           className="
//             flex items-center gap-2
//             px-4 py-2 
//             bg-gray-100 hover:bg-gray-200 
//             text-gray-700 rounded-lg shadow 
//             text-sm font-medium
//             transition-all duration-200
//           "
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <HomeIcon className="w-4 h-4 text-blue-600" />
//           Back to Home
//         </motion.button>
//       </div>

//       {/* ✅ Header Section */}
//       <motion.div className="relative text-center" variants={itemVariants}>
//         <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-800 flex flex-wrap items-center justify-center gap-2">
//           <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
//           <span>{profile.username}'s Profile</span>
//         </h1>

//         {/* ✅ Responsive Edit Button */}
//         <motion.button
//           onClick={handleEditProfile}
//           className="
//             mt-4 sm:mt-0
//             block sm:absolute sm:right-6 sm:top-4
//             px-4 py-2 
//             text-sm sm:text-base 
//             font-medium text-white 
//             bg-blue-600 rounded-lg shadow 
//             hover:bg-blue-700 
//             flex items-center justify-center gap-2
//             mx-auto sm:mx-0
//           "
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <PencilIcon className="w-4 h-4" />
//           Edit Profile
//         </motion.button>

//         <p className="text-sm sm:text-base text-gray-500 mt-2">
//           Welcome back to your dashboard
//         </p>
//       </motion.div>

//       {/* ✅ Basic Info Section */}
//       <motion.section
//         className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
//         variants={itemVariants}
//       >
//         {/* Section Heading */}
//         <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-slate-800">
//           <MailIcon className="w-6 h-6 mr-3 text-blue-600" />
//           Basic Info
//         </h2>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm sm:text-base">

//           {/* Email */}
//           <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <MailIcon className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-xs uppercase font-semibold">Email</p>
//               <p className="font-medium">{profile?.email || "Not Provided"}</p>
//             </div>
//           </div>

//           {/* Followers */}
//           <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition">
//             <div className="bg-green-100 p-2 rounded-full">
//               <UsersIcon className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-xs uppercase font-semibold">Followers</p>
//               <p className="font-medium">
//                 {profile?.followers?.length
//                   ? profile.followers.map((f) => f.username).join(", ")
//                   : "No followers"}
//               </p>
//             </div>
//           </div>

//           {/* Following */}
//           <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:shadow-sm transition sm:col-span-2">
//             <div className="bg-indigo-100 p-2 rounded-full">
//               <UserPlusIcon className="w-5 h-5 text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-xs uppercase font-semibold">Following</p>
//               <p className="font-medium">
//                 {profile?.following?.length
//                   ? profile.following.map((f) => f.username).join(", ")
//                   : "None"}
//               </p>
//             </div>
//           </div>

//         </div>
//       </motion.section>


//       {/* ✅ Favourite Blogs */}
//       <motion.section
//         className="bg-white rounded-xl shadow-md p-4 sm:p-6"
//         variants={itemVariants}
//       >
//         <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-pink-700">
//           <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
//           Favourite Blogs
//         </h2>
//         {profile.favourites.length ? (
//           <div className="flex flex-col gap-4">
//             {profile.favourites.map((fav) => (
//               <motion.div
//                 key={fav._id}
//                 className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <div
//                   onClick={() => handleBlogClick(fav._id)}
//                   className="cursor-pointer flex-1"
//                 >
//                   <strong className="text-slate-800 block truncate text-base sm:text-lg">
//                     {fav.title}
//                   </strong>
//                   <span className="text-pink-700 text-xs sm:text-sm">
//                     by {fav.author.username}
//                   </span>
//                 </div>
//                 <button
//                   className="
//                     px-2 py-1 
//                     text-[10px] sm:text-xs
//                     bg-red-500 text-white 
//                     rounded 
//                     hover:bg-red-600 
//                     transition-all duration-200
//                     whitespace-nowrap
//                   "
//                   onClick={() => handleRemoveFromFavourites(fav._id)}
//                 >
//                   Remove
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No favourites yet.</p>
//         )}
//       </motion.section>

//       {/* ✅ My Blogs */}
//       <motion.section
//         className="bg-white rounded-xl shadow-md p-4 sm:p-6"
//         variants={itemVariants}
//       >
//         <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center text-blue-700">
//           <FileTextIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
//           My Blogs
//         </h2>

//         {blogs.length ? (
//           <div className="flex flex-col gap-4">
//             {blogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 className="
//                   flex flex-col sm:flex-row items-start 
//                   bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow hover:shadow-lg 
//                   overflow-hidden transition-all duration-300
//                   cursor-pointer
//                 "
//                 whileHover={{ scale: 1.02 }}
//                 onClick={() => handleBlogClick(blog._id)}
//               >
//                 {/* ✅ Blog Image */}
//                 {blog.image && (
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="
//                       w-full sm:w-40 h-32 sm:h-auto object-cover
//                       sm:rounded-none rounded-t-lg
//                     "
//                   />
//                 )}

//                 {/* ✅ Blog Content */}
//                 <div className="p-4 flex-1">
//                   <strong className="text-slate-800 text-base sm:text-lg block mb-1 truncate">
//                     {blog.title}
//                   </strong>
//                   <p className="text-gray-700 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
//                     {blog.content}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">You haven't written any blogs yet.</p>
//         )}
//       </motion.section>
//     </motion.div>
//   );
// }

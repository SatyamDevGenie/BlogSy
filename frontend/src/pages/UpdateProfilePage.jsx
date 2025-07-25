import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserIcon, SaveIcon, ArrowLeftIcon } from "lucide-react";
import { updateProfile, reset } from "../features/auth/authSlice";

export default function UpdateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const token = user?.token;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [localMessage, setLocalMessage] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLocalError("You must be logged in to update your profile.");
      return;
    }
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
    });

    return () => {
      dispatch(reset());
    };
  }, [token, user, dispatch]);

  useEffect(() => {
    if (isSuccess) setLocalMessage("✅ Profile updated successfully!");
    if (isError) setLocalError(message);
  }, [isSuccess, isError, message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalMessage(null);
    setLocalError(null);
    dispatch(updateProfile(formData));
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-100"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {/* Header */}
        <motion.h2
          className="text-3xl font-extrabold text-center text-indigo-600 flex items-center justify-center gap-2 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <UserIcon className="w-7 h-7 text-indigo-500" />
          Update Profile
        </motion.h2>

        {/* Alerts */}
        {localMessage && (
          <motion.p
            className="text-green-600 bg-green-100 text-center text-sm py-2 rounded-lg mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localMessage}
          </motion.p>
        )}

        {localError && (
          <motion.p
            className="text-red-600 bg-red-100 text-center text-sm py-2 rounded-lg mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localError}
          </motion.p>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password (optional)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-50 text-gray-700 placeholder-gray-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <motion.button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SaveIcon className="w-5 h-5 mr-2" />
              Save Changes
            </motion.button>

            <motion.button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full sm:w-auto flex items-center justify-center text-indigo-500 font-semibold px-6 py-3 rounded-full border border-indigo-300 hover:bg-indigo-50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Profile
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}






// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   UserIcon,
//   SaveIcon,
//   ArrowLeftIcon,
// } from "lucide-react";

// import { updateProfile, reset } from "../features/auth/authSlice";

// export default function UpdateProfilePage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isSuccess, isError, message } = useSelector(
//     (state) => state.auth
//   );
//   const token = user?.token;

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (!token) {
//       setLocalError("You must be logged in to update your profile.");
//       return;
//     }
//     setFormData({
//       username: user.username || "",
//       email: user.email || "",
//       password: "",
//     });

//     return () => {
//       dispatch(reset());
//     };
//   }, [token, user, dispatch]);

//   const [localMessage, setLocalMessage] = useState(null);
//   const [localError, setLocalError] = useState(null);

//   useEffect(() => {
//     if (isSuccess) {
//       setLocalMessage("Profile updated successfully!");
//     }
//     if (isError) {
//       setLocalError(message);
//     }
//   }, [isSuccess, isError, message]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLocalMessage(null);
//     setLocalError(null);
//     dispatch(updateProfile(formData));
//   };

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div
//         className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.h2
//           className="text-2xl font-bold text-center text-slate-800 flex items-center justify-center mb-6"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
//           Update Profile
//         </motion.h2>

//         {localMessage && (
//           <motion.p
//             className="text-green-600 text-center text-sm mb-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {localMessage}
//           </motion.p>
//         )}

//         {localError && (
//           <motion.p
//             className="text-red-600 text-center text-sm mb-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             {localError}
//           </motion.p>
//         )}

//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {/* Username */}
//           <motion.div
//             initial={{ x: -50 }}
//             animate={{ x: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </motion.div>

//           {/* Email */}
//           <motion.div
//             initial={{ x: 50 }}
//             animate={{ x: 0 }}
//             transition={{ delay: 0.5 }}
//           >
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </motion.div>

//           {/* Password */}
//           <motion.div
//             initial={{ x: -50 }}
//             animate={{ x: 0 }}
//             transition={{ delay: 0.6 }}
//           >
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-slate-700 mb-1"
//             >
//               Password (optional)
//             </label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Leave blank to keep current password"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </motion.div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//             <motion.button
//               type="submit"
//               className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <SaveIcon className="w-5 h-5 mr-2" />
//               Save Changes
//             </motion.button>

//             <motion.button
//               type="button"
//               onClick={() => navigate("/profile")}
//               className="w-full sm:w-auto flex items-center justify-center text-gray-600 hover:text-gray-800 transition"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ArrowLeftIcon className="w-5 h-5 mr-2" />
//               Back to Profile
//             </motion.button>
//           </div>
//         </motion.form>
//       </motion.div>
//     </motion.div>
//   );
// }

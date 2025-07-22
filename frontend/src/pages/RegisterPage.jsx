import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || "Registration failed. Please try again.");
    }

    if (isSuccess && user) {
      toast.success(`${user.username || user.email} registered successfully 🎉`);
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  {/* Register Card */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-white/40"
  >
    {/* Heading */}
    <motion.h1
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    >
      Create Your Account ✨
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center text-gray-600 mb-6 text-xs sm:text-sm lg:text-base"
    >
      Join our blogging community and start sharing your ideas today!
    </motion.p>

    {/* Form */}
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Username */}
      <motion.div whileHover={{ scale: 1.02 }} className="group">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your username"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition-all group-hover:shadow-md"
          required
        />
      </motion.div>

      {/* Email */}
      <motion.div whileHover={{ scale: 1.02 }} className="group">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 shadow-sm transition-all group-hover:shadow-md"
          required
        />
      </motion.div>

      {/* Password */}
      <motion.div whileHover={{ scale: 1.02 }}>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 pr-12 shadow-sm transition-all"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 sm:top-3 text-gray-500 hover:text-blue-600 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </motion.div>

      {/* Register Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Registering...
          </>
        ) : (
          "Register"
        )}
      </motion.button>
    </motion.form>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600"
    >
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 font-medium hover:underline">
        Login here
      </Link>
    </motion.div>
  </motion.div>
</div>


  );
}

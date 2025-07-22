import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(
        `${user.name || user.username || user.email} logged in successfully 🎉`
      );
      navigate("/");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message || "Login failed. Please check your credentials.");
      dispatch(reset());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (

   <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  {/* Login Card */}
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
      Welcome Back 👋
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center text-gray-600 mb-6 text-xs sm:text-sm lg:text-base"
    >
      Log in to continue exploring your favorite stories.
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
      {/* Email */}
      <motion.div whileHover={{ scale: 1.02 }} className="group">
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoFocus
          value={form.email}
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
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 pr-10 shadow-sm transition-all"
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

      {/* Login Button */}
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
            Logging in...
          </>
        ) : (
          "Login"
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
      New here?{" "}
      <Link
        to="/register"
        className="text-blue-600 font-medium hover:underline"
      >
        Create an account
      </Link>
    </motion.div>
  </motion.div>

  {/* ✅ Warm Welcome Section */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="mt-8 sm:mt-10 w-full max-w-xs sm:max-w-lg lg:max-w-3xl text-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md"
  >
    <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
      🌟 We’re thrilled to have you back!
    </h2>
    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
      Dive into a world of amazing blogs, connect with like-minded people, and
      share your thoughts with the community. Your voice matters—let’s make
      this journey inspiring together! 🚀
    </p>
  </motion.div>
</div>

  );
}

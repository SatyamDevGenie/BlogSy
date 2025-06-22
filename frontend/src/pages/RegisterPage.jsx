import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      toast.success(
        `${user.name || user.username || user.email} Register Successfully 🎉`
      );
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-slate-800"
        >
          Register
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm sm:text-base text-gray-600 mb-6"
        >
          Join our blogging platform and share your ideas
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["username", "email", "password"].map((field) => (
            <motion.div key={field} whileFocus={{ scale: 1.02 }}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <motion.input
                id={field}
                name={field}
                type={field === "username" ? "text" : field}
                placeholder={
                  field === "username"
                    ? "Your username"
                    : field === "email"
                    ? "you@example.com"
                    : "••••••••"
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                value={formData[field]}
                onChange={handleChange}
                required
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm mt-6 text-center text-gray-600"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

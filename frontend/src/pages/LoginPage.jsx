import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(
        `${user.name || user.username || user.email} Login Successfully 🎉`
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-slate-800"
        >
          Login
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mb-6 italic text-sm sm:text-base"
        >
          To see your favorite stories, please log in ❤️
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["email", "password"].map((field) => (
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
                type={field}
                placeholder={field === "email" ? "you@example.com" : "••••••••"}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                value={form[field]}
                onChange={handleChange}
                required
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          New here?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

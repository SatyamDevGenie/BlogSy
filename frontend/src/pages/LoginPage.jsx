import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) navigate("/");
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-2"
        >
          Login
        </motion.h1>

        {/* Emotional prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mb-6 italic"
        >
          To see your favorite stories, please log in ❤️
        </motion.p>

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 p-3 rounded mb-4"
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["email", "password"].map((field) => (
            <motion.div key={field} whileFocus={{ scale: 1.02 }}>
              <label
                htmlFor={field}
                className="block text-sm font-medium mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <motion.input
                id={field}
                name={field}
                type={field}
                placeholder={
                  field === "email" ? "you@example.com" : "••••••••"
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form[field]}
                onChange={handleChange}
                required
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
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

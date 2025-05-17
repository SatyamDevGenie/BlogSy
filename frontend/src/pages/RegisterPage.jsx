import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    if (user || isSuccess) navigate("/");
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-2"
        >
          Register
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-600 mb-6"
        >
          Join our blogging platform and share your ideas
        </motion.p>

        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm"
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["username", "email", "password"].map((field) => (
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
                type={field === "username" ? "text" : field}
                placeholder={
                  field === "username"
                    ? "Your username"
                    : field === "email"
                    ? "you@example.com"
                    : "••••••••"
                }
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition"
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
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import SingleBlogPage from "./pages/SingleBlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlogPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateProfile"
          element={
            <ProtectedRoute>
              <UpdateProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

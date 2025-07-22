export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 mt-10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
            BlogSy Platform
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate space to share ideas, knowledge, and stories with the world.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Built with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/satyam-sawant-a257802a7/"
              className="text-blue-400 hover:text-blue-500 font-bold transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Satyam Sawant
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/latest" className="hover:text-blue-400 transition">
                Latest Blogs
              </a>
            </li>
            <li>
              <a href="/trending" className="hover:text-blue-400 transition">
                Trending Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 inline-block pb-1">
            Contact
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              📧{" "}
              <a
                href="mailto:satyamsawant54@gmail.com"
                className="hover:text-blue-400 transition"
              >
                satyamsawant54@gmail.com
              </a>
            </li>
            <li>
              📞{" "}
              <a href="tel:+919326903988" className="hover:text-blue-400 transition">
                +91 9326903988
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-600 inline-block pb-1">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-400 mb-3">Follow us for updates</p>
          <div className="flex space-x-4 text-2xl">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-sky-400 transition transform hover:scale-110"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition transform hover:scale-110"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/satyam-sawant-a257802a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center">
        <span className="text-sm sm:text-base bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold tracking-wide">
          © {new Date().getFullYear()} BlogSy | Powered by Satyam Software Solutions
        </span>
      </div>
    </footer>
  );
}

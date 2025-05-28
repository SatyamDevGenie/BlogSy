export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            BlogSy Platform
          </h2>
          <p className="text-gray-400 text-sm">
            A place to share knowledge, ideas, and stories with the world.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Built with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/satyam-sawant-a257802a7/"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Satyam Sawant
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/latest" className="hover:text-blue-400">
                Latest Blogs
              </a>
            </li>
            <li>
              <a href="/trending" className="hover:text-blue-400">
                Trending Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              📧{" "}
              <a
                href="mailto:satyamsawant54@gmail.com"
                className="hover:text-blue-400"
              >
                satyamsawant54@gmail.com
              </a>
            </li>
            <li>
              📞{" "}
              <a href="tel:+919326903988" className="hover:text-blue-400">
                +91 9326903988
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media (optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Share your thoughts and Blogs
          </h3>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a href="#" className="hover:text-blue-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/satyam-sawant-a257802a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-600 py-4 text-center font-bold text-sm text-gray-500">
        BlogSy {new Date().getFullYear()} Satyam Software Solutions
      </div>
    </footer>
  );
}

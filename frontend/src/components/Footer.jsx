export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t border-gray-300 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-center text-gray-700">
        {/* Branding & Creator Info */}
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-xl font-bold text-gray-800">BlogSy Platform</h2>
          <p className="text-sm">
            Built with passion by{" "}
            <span className="text-blue-600 font-medium">Satyam Sawant</span>
          </p>
        </div>

        {/* Contact Details */}
        <div className="text-sm space-y-1 text-center sm:text-right">
          <p>
            📧{" "}
            <a
              href="mailto:satyamsawant54@gmail.com"
              className="text-blue-500 hover:underline"
            >
              satyamsawant54@gmail.com
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href="tel:+919326903988"
              className="text-blue-500 hover:underline"
            >
              +91 9326903988
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        BlogSy {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

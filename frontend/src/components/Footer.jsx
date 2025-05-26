export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 border-t border-gray-300 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center text-gray-700">
        {/* Branding & Creator Info */}
        <div className="text-center sm:text-left mb-6 sm:mb-0">
          <h2 className="text-2xl font-bold text-white">BlogSy Platform</h2>
          <p className="text-sm mt-1 text-gray-600">
            Created with passion by{" "}
            <a href="https://www.linkedin.com/in/satyam-sawant-a257802a7/">
              <span className="text-blue-600 font-bold">Satyam Sawant</span>
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-1 tracking-wide font-semibold">
            Software Developer | MERN Stack Specialist
          </p>
        </div>

        {/* Contact Details */}
        <div className="text-md font-semibold space-y-3 text-center sm:text-right">
          <p>
            📧{" "}
            <a
              href="mailto:satyamsawant54@gmail.com"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              satyamsawant54@gmail.com
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href="tel:+919326903988"
              className="text-blue-600 hover:underline"
            >
              +91 9326903988
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-5 text-center text-md text-white tracking-wide font-semibold">
        BlogSy {new Date().getFullYear()} @ Satyam Software Solutions
      </div>
    </footer>
  );
}

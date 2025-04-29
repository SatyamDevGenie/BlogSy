// 🛡️ errorHandler.js - Global error handling middleware

// 🚫 Middleware to handle "Not Found" routes
export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`); // 📍 Construct error with requested URL
    res.status(404); // ⚠️ Set 404 status code
    next(error); // ⏭️ Pass to the error handling middleware
  };
  
  // ❗ Middleware to handle all other server errors
  export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 🧭 Use 500 if status not set
    res.status(statusCode);
    res.json({
      error: {
        message: err.message, // 💬 Send error message
        stack: process.env.NODE_ENV === "production" ? err.stack : null, // 🐛 Show stack only in development
      },
    });
  };
  
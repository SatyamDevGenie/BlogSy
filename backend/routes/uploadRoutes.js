import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure 'uploads' folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File Type Validation
const checkFileTypes = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, JPG, PNG) are allowed"));
  }
};

// Initialize Multer with Storage and File Filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileTypes(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Upload Route with Error Handling
router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Normalize path for cross-platform support
    const filePath = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.json({ filePath });
  });
});

export default router;















// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// // Required for ES module support (__dirname workaround)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // Absolute path for the uploads folder
// const uploadDir = path.join(__dirname, "..", "uploads");

// // Create uploads folder if not exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// // File type validation
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png|pdf/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);
//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("❌ Only JPG, JPEG, PNG, or PDF files allowed!");
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// // POST route to upload a single file
// // Upload Route with Error Handling
// router.post("/", (req, res) => {
//   upload.single("image")(req, res, (err) => {
//     if (err) {
//       console.error("Upload Error:", err.message);
//       return res.status(400).json({ error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Normalize path for cross-platform support
//     const filePath = `${req.protocol}://${req.get("host")}/uploads/${
//       req.file.filename
//     }`;
//     res.json({ filePath });
//   });
// });

// export default router;









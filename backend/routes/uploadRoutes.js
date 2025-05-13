import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads folder if not exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
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

// File type validation (optional)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("❌ Only JPG, JPEG, PNG, or PDF files allowed!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// POST route to upload a single file
router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "✅ File uploaded successfully",
    filePath: `/${req.file.path}`,
  });
});

export default router;

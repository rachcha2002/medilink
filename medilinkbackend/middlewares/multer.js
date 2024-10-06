const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Memory storage as we will directly upload to Firebase
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/; // Only allow PDF files
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Only PDFs are allowed!"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10 MB
});

module.exports = upload;

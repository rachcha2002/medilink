const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Memory storage as we will directly upload to Firebase

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allowed file types (PDF in this case)
    const fileTypes = /pdf/;

    // Check the file extension
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // Check the mimetype (extra validation for security)
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // File is valid
    } else {
      return cb(new Error("Only PDF files are allowed!"), false); // Invalid file
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10 MB
});

// Export the configured upload middleware
module.exports = upload;

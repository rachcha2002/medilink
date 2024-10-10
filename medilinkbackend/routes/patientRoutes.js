const express = require("express");
const router = express.Router();
const multer = require("multer");
const patientProfileController = require("../controllers/patient-controller");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage to store files temporarily in memory
const upload = multer({ storage: storage }); // Initialize multer with memory storage

// Routes
// 1. Create a new patient profile (with file upload for photo)
router.post("/create", upload.single("photo"), patientProfileController.create);

// 2. Get all patient profiles
router.get("/getall", patientProfileController.getAll);

// 3. Get patient profile by ID
router.get("/getbyid/:id", patientProfileController.getById);

// 4. Update patient profile by ID (with optional file upload for new photo)
router.put(
  "/update/:id",
  upload.single("photo"),
  patientProfileController.updateById
);

// 5. Update current medical information (diagnoses, medications, allergies) by ID
router.patch(
  "/updateCurrentMedical/:id",
  patientProfileController.updateCurrentMedicalById
);

// 6. Soft delete patient profile by ID
router.delete("/delete/:id", patientProfileController.deleteById);

module.exports = router;

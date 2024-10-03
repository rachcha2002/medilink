const express = require("express");
const router = express.Router();
const MedicalStaffController = require("../controllers/medicalstaff-controller");

// Create a new medical staff (doctor or nurse)
router.post("/create-medicalstaff", MedicalStaffController.createMedicalStaff);

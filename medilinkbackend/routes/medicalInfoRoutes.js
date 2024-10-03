const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/MedicalInfoControllers/prescription-controller");

/*-------Prescription Routes-------*/

// Create a new prescription
router.post("/prescriptions", prescriptionController.createPrescription);
// Get all prescriptions
router.get("/prescriptions", prescriptionController.getAllPrescriptions);
// Get prescription by ID
router.get("/prescriptions/:id", prescriptionController.getPrescriptionById);
// Get prescriptions by hospital
router.get(
  "/prescriptions/hospital/:hospital",
  prescriptionController.getPrescriptionsByHospital
);
// Get prescriptions by doctor ID
router.get(
  "/prescriptions/doctor/:doctorId",
  prescriptionController.getPrescriptionsByDoctorId
);
// Get prescriptions by patient ID
router.get(
  "/prescriptions/patient/:patientId",
  prescriptionController.getPrescriptionsByPatientId
);
// Update prescription by ID
router.put("/prescriptions/:id", prescriptionController.updatePrescription);
// Delete prescription by ID
router.delete(
  "/prescriptions/:id",
  prescriptionController.deletePrescriptionById
);

module.exports = router;

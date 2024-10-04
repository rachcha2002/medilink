const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/MedicalInfoControllers/prescription-controller");
const reportController = require("../controllers/MedicalInfoControllers/reportController");
const upload = require("../middlewares/multer");

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

/*-------Medical Report Routes-------*/
// Create report with file upload (no duplicates allowed for same testName and date)
router.post(
  "/reports/createWithFile",
  upload.single("resultPdf"),
  reportController.createReportWithFile
);

// Get all reports
router.get("/reports/all", reportController.getAllReports);

// Get reports by hospital
router.get(
  "/reports/hospital/:hospital",
  reportController.getReportsByHospital
);

// Get report by ID
router.get("/reports/page/:reportType/:id", reportController.getReportById);

// Get reports by laboratoristId
router.get(
  "/reports/laboratory/laboratorist/:laboratoristId",
  reportController.getReportsByLaboratoristId
);

// Get reports by radiologistId
router.get(
  "/reports/radiology/radiologist/:radiologistId",
  reportController.getReportsByRadiologistId
);

// Get reports by patientId
router.get(
  "/reports/patients/:patientId",
  reportController.getReportsByPatientId
);

// Delete report by ID (also deletes the file from Firebase)
router.delete("/reports/:reportType/:id", reportController.deleteReportById);

// Update report by ID (with optional file upload and replacement)
router.put(
  "/reports/:reportType/:id",
  upload.single("resultPdf"),
  reportController.updateReportById
);

module.exports = router;

const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/MedicalInfoControllers/prescription-controller");
const reportController = require("../controllers/MedicalInfoControllers/reportController");
const upload = require("../middlewares/multer");
const medicalRecordController = require("../controllers/MedicalInfoControllers/medicalRecordController");

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

/*-------Medical Record Routes-------*/

// Route to create a new medical record with a file upload
router.post(
  "/medical-records",
  upload.single("medicalDocument"),
  medicalRecordController.createMedicalRecord
);

// Route to get all medical records
router.get("/medical-records", medicalRecordController.getAllMedicalRecords);

// Route to get a medical record by ID
router.get(
  "/medical-records/:id",
  medicalRecordController.getMedicalRecordById
);

// Route to get medical records by hospital
router.get(
  "/medical-records/hospital/:hospital",
  medicalRecordController.getMedicalRecordsByHospital
);

// Route to get medical records by patient ID
router.get(
  "/medical-records/patient/:patientId",
  medicalRecordController.getMedicalRecordsByPatientId
);

// Route to get medical records by the creator's ID
router.get(
  "/medical-records/created-by/:createdBy",
  medicalRecordController.getMedicalRecordsByCreatedBy
);

// Route to update a medical record by ID
router.put(
  "/medical-records/:id",
  upload.single("medicalDocument"),
  medicalRecordController.updateMedicalRecordById
);

// Route to delete a medical record by ID
router.delete(
  "/medical-records/:id",
  medicalRecordController.deleteMedicalRecordById
);

module.exports = router;

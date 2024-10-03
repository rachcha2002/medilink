// routes/complaintRoutes.js
const express = require("express");


const {
  createDiseaseAlert,
  getDiseaseAlertById,
  updateDiseaseAlert,
  deleteDiseaseAlert,
  getAllDiseaseAlerts,
} = require("../controllers/PaymentControllers/diseaseAlert");
const router = express.Router();


// Create a new DiseaseAlert
router.post("/disease-alerts", createDiseaseAlert);

// Get all DiseaseAlerts
router.get("/disease-alerts", getAllDiseaseAlerts);

// Get a single DiseaseAlert by ID
router.get("/disease-alerts/:id", getDiseaseAlertById);

// Update a DiseaseAlert by ID
router.put("/disease-alerts/:id", updateDiseaseAlert);

// Delete a DiseaseAlert by ID
router.delete("/disease-alerts/:id", deleteDiseaseAlert);




module.exports = router;
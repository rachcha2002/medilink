const express = require("express");
const router = express.Router();
const {
  createMedicalStaff,
  getAllDoctors,
  getAllNurses,
  getDoctorById,
  getNurseById,
  deleteDoctorById,
  deleteNurseById,
  updateDoctorById,
  updateNurseById,
} = require("../controllers/medicalstaff-controller");

const {
  createMLTStaff,
  getAllMLTStaff,
  getMLTStaffById,
  deleteMLTStaffById,
  updateMLTStaffById,
} = require("../controllers/mltstaff-controller");

/*-------Medical Staff Routes-------*/

// Create a new medical staff (doctor or nurse)
router.post("/create-medicalstaff", createMedicalStaff);

// Get all doctors
router.get("/doctors", getAllDoctors);

// Get doctor by ID
router.get("/doctors/:id", getDoctorById);

// Get all nurses
router.get("/nurses", getAllNurses);

// Get nurse by ID
router.get("/nurses/:id", getNurseById);

// Delete doctor by ID
router.delete("/doctors/:id", deleteDoctorById);

// Delete nurse by ID
router.delete("/nurses/:id", deleteNurseById);

// Update doctor by ID
router.put("/doctors/:id", updateDoctorById);

// Update nurse by ID
router.put("/nurses/:id", updateNurseById);

/*-------MLT Staff Routes-------*/

// Create a new MLT staff
router.post("/create-mltstaff", createMLTStaff);

// Get all MLT staff
router.get("/mltstaff", getAllMLTStaff);

// Get MLT staff by ID
router.get("/mltstaff/:id", getMLTStaffById);

// Delete MLT staff by ID
router.delete("/mltstaff/:id", deleteMLTStaffById);

// Update MLT staff by ID
router.put("/mltstaff/:id", updateMLTStaffById);

module.exports = router;

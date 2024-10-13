const express = require('express');
const router = express.Router();

// Importing controller functions from the correct path
const {
    createHospital,
    getAllHospitalDetails,
    getHospitalDetailById,
    getHospitalDetailByAdminId, // Renamed for consistency
    updateHospitalById,
    deleteHospitalById,
    deleteHospitalByRegistrationID,
} = require("../controllers/Hospital&Admin/Hospital"); // Ensure this path is correct

// Route definitions
router.post("/addhospital", createHospital); // POST to create a hospital
router.get("/gethospitals", getAllHospitalDetails); // GET to fetch all hospitals
router.get("/gethospital/:id", getHospitalDetailById); // GET to fetch a hospital by ID
router.get('/gethospitalbyadmin/:adminID', getHospitalDetailByAdminId); // GET by admin ID
router.put("/updatehospital/:id", updateHospitalById); // PUT to update a hospital by ID
router.delete("/deletehospital/:id", deleteHospitalById); // DELETE a hospital by ID
router.delete("/deletehospitalByID/:registrationID", deleteHospitalByRegistrationID); // DELETE by registration ID

module.exports = router;

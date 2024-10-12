const express = require('express');
const router = express.Router();

const {
    createHospital,
    getAllHospitalDetails,
    getHospitalDetailById,
    updateHospitalById,
    deleteHospitalById,
    deleteHospitalByRegistrationID,
} = require("../controllers/Hospital&Admin/Hospital");

router.post("/addhospital", createHospital);
router.get("/gethospitals", getAllHospitalDetails);
router.get("/gethospital/:id", getHospitalDetailById);
router.put("/updatehospital/:id", updateHospitalById);
router.delete("/deletehospital/:id", deleteHospitalById);
router.delete("/deletehospitalByID/:registrationID", deleteHospitalByRegistrationID);

module.exports = router;

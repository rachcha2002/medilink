const express = require('express');
const router = express.Router();

const {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdmin
} = require("../controllers/Hospital&Admin/HospitalAdmin");

router.post("/addhospitaladmin",createAdmin );
router.get("/gethospitaladmins", getAllAdmins);
router.get("/gethospitaladmin/:id", getAdminById);
router.put("/updateadmin/:id", updateAdminById);
router.delete("/deletehospitaladmin/:id", deleteAdmin);

module.exports = router;

const express = require("express");
const router = express.Router();
const {createAppointment,getappointmentlist,updateappointment,deleteappointment, approveappointment, completeappointment, getappointmentbyhospital, rejectappointment} = require("../controllers/AppointmentControllers/appointments");

router.post("/makeappointment", createAppointment);
router.get("/getappointmentlist/:type", getappointmentlist);
router.put("/updateappointment/:type/:id", updateappointment);
router.delete("/deleteappointment/:type/:id", deleteappointment);
router.put("/approveappointment/:type/:id", approveappointment);
router.put("/rejectappointment/:type/:id",rejectappointment);
router.put("/completeappointment/:type/:id",completeappointment);
router.get("/hospitalappointments/:type/:hospitalId", getappointmentbyhospital);


module.exports = router;
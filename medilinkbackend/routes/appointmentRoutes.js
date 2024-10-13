const express = require("express");
const router = express.Router();
const {createAppointment,getappointmentlist,updateappointment,deleteappointment, approveappointment, completeappointment, getappointmentbyhospital, rejectappointment,getHospitalsbytype,getDoctorByHospital,getDoctorBySpeciality} = require("../controllers/AppointmentControllers/appointments");

router.post("/makeappointment", createAppointment);
router.get("/getappointmentlist/:userid", getappointmentlist);
router.put("/updateappointment/:type/:id", updateappointment);
router.delete("/deleteappointment/:type/:id", deleteappointment);
router.put("/approveappointment/:type/:id", approveappointment);
router.put("/rejectappointment/:type/:id",rejectappointment);
router.put("/completeappointment/:type/:id",completeappointment);
router.get("/hospitalappointments/:type/:hospitalId", getappointmentbyhospital);
router.get("/gethospitalsbytype/:hospitalType", getHospitalsbytype);
router.get("/getdoctorbyhospital/:hospitalName", getDoctorByHospital);
router.get("/getdoctorbyspeciality/:hospitalName/:speciality", getDoctorBySpeciality);


module.exports = router;
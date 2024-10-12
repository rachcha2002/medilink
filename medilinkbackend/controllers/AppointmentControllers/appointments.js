const AppointmentFactory = require("../../factory/appointmentfactory");
const HospitalSchema = require("../../models/Hospital&Admin/HospitalSchema");
const DoctorSchema = require("../../models/MedicalStaff/doctorModel");

exports.createAppointment = async (req, res) => {

    const { type, ...appointmentData } = req.body;

    try {
        const AppointmentModel = AppointmentFactory.getModel(type);

        const appointment = new AppointmentModel(appointmentData);

        await appointment.save();

        res.status(201).json({ message: `${type} appointment created successfully`, appointment });
    } catch (error) {
        res.status(500).json({
            message: "Error saving appointment",
            error: error.message,
        });
    }
}

exports.getappointmentlist = async (req, res) => {
    const { type } = req.params;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointments = await AppointmentModel.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching appointments",
            error: error.message,
        });
    }
}

exports.updateappointment = async (req, res) => {
    const { type, id } = req.params;
    const { ...appointmentData } = req.body;

    try {
        const AppointmentModel = AppointmentFactory.getModel(type);

        const appointment = await AppointmentModel.findByIdAndUpdate(id, appointmentData, { new: true });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: `${type} appointment updated successfully`, appointment });
    } catch (error) {
        res.status(500).json({
            message: "Error updating appointment",
            error: error.message,
        });
    }
}

exports.deleteappointment = async (req, res) => {
    const { type, id } = req.params;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointment = await AppointmentModel.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: `${type} appointment deleted successfully` });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting appointment",
            error: error.message,
        });
    }
}

exports.approveappointment = async (req, res) => {
    const { type, id } = req.params;
    const { payment } = req.body;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointment = await AppointmentModel.findByIdAndUpdate(id, { status: "approved", payment  }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: `${type} appointment approved successfully`, appointment });
    }
    catch (error) {
        res.status(500).json({
            message: "Error approving appointment",
            error: error.message,
        });
    }
};

exports.completeappointment = async (req, res) => {
    const { type, id } = req.params;
    const { payment } = req.body;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointment = await AppointmentModel.findByIdAndUpdate(id, { status: "completed", payment }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: `${type} appointment completed successfully`, appointment });
    } catch (error) {
        res.status(500).json({
            message: "Error completing appointment",
            error: error.message,
        });
    }
};

exports.getappointmentbyhospital = async (req, res) => {
    const { type, hospitalId } = req.params;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointments = await AppointmentModel.find({ hospitalId: hospitalId });
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this hospital" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching appointments",
            error: error.message,
        });
    }
}

exports.rejectappointment = async (req, res) => {
    const { type, id } = req.params;
    try {
        const AppointmentModel = AppointmentFactory.getModel(type);
        const appointment = await AppointmentModel.findByIdAndUpdate(id, { status: "rejected" }, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: `${type} appointment rejected successfully`, appointment });
    }
    catch (error) {
        res.status(500).json({
            message: "Error rejecting appointment",
            error: error.message,
        });
    }
}

exports.getHospitalsbytype = async (req, res) => {
    const { hospitalType } = req.params;
    try {
        const hospitals = await HospitalSchema.find({ hospitalType: hospitalType });
        if (hospitals.length === 0) {
            return res.status(404).json({ message: "No hospitals found for this type" });
        }
        res.status(200).json(hospitals);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching hospitals",
            error: error.message,
        });
    }
}

exports.getDoctorByHospital = async (req, res) => {
    const { hospitalName } = req.params;
    try {
        const doctors = await DoctorSchema.find({ hospital: hospitalName });
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this hospital" });
        }
        res.status(200).json(doctors);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching doctors",
            error: error.message,
        });
    }
}

exports.getDoctorBySpeciality = async (req, res) => {
    const { hospitalName,speciality } = req.params;
    try {
        const doctors = await DoctorSchema.find({ hospital: hospitalName , speciality: speciality });
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this hospital" });
        }
        res.status(200).json(doctors);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching doctors",
            error: error.message,
        });
    }
}


const AppointmentFactory = require("../../factory/appointmentfactory");


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
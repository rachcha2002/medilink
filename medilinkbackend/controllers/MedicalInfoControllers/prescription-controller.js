const Prescription = require("../../models/MedicalInfo/prescriptionModel");

// Create a new prescription
const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(400).json({ message: "Error creating prescription", error });
  }
};

// Get all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
};

// Get prescription by ID
const getPrescriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching prescription by ID", error });
  }
};

// Get prescriptions by hospital
const getPrescriptionsByHospital = async (req, res) => {
  const { hospital } = req.params;
  try {
    const prescriptions = await Prescription.find({ hospital });
    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this hospital" });
    }
    res.status(200).json(prescriptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching prescriptions by hospital", error });
  }
};

// Get prescriptions by doctor ID
const getPrescriptionsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const prescriptions = await Prescription.find({ doctorId });
    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this doctor" });
    }
    res.status(200).json(prescriptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching prescriptions by doctor ID", error });
  }
};

// Get prescriptions by patient ID
const getPrescriptionsByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const prescriptions = await Prescription.find({ patientId });
    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this patient" });
    }
    res.status(200).json(prescriptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching prescriptions by patient ID", error });
  }
};

// Update a prescription by ID
const updatePrescription = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ message: "Error updating prescription", error });
  }
};

// Delete a prescription by ID
const deletePrescriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findByIdAndDelete(id);
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting prescription", error });
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByHospital,
  getPrescriptionsByDoctorId,
  getPrescriptionsByPatientId,
  updatePrescription,
  deletePrescriptionById,
};

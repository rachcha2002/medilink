const HospitalAdmin = require("../../models/Hospital&Admin/HospitalAdminSchema");

// Create a new admin record
exports.createAdmin = async (req, res) => {
  try {
    const createAdmin = new HospitalAdmin(req.body);
    const savedAdmin = await createAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all billing records
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await HospitalAdmin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a billing record by ID
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await HospitalAdmin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin record not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a admin record by ID
exports.updateAdminById= async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await HospitalAdmin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin record not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a admin record by ID
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await HospitalAdmin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin record not found" });
    }
    res.status(200).json({ message: "Admin record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

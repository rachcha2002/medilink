const Billing = require("../../models/PaymentModels/BillingSchema");

// Create a new billing record
exports.createBilling = async (req, res) => {
  try {
    const billing = new Billing(req.body);
    const savedBilling = await billing.save();
    res.status(201).json(savedBilling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all billing records
exports.getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a billing record by ID
exports.getBillingById = async (req, res) => {
  try {
    const { id } = req.params;
    const billing = await Billing.findById(id);
    if (!billing) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a billing record by ID
exports.updateBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBilling = await Billing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBilling) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a billing record by ID
exports.deleteBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBilling = await Billing.findByIdAndDelete(id);
    if (!deletedBilling) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.status(200).json({ message: "Billing record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Billing = require("../../models/PaymentModels/BillingSchema");

// Create a new billing record
exports.createBilling = async (req, res) => {
  try {
    console.log(req.body);
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

//Get Pending Payments
exports.getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await Billing.find({ paymentStatus: "Pending" });
    res.status(200).json(pendingPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBillsByPatientId = async (req, res) => {
  try {
    const { patientID } = req.params;
    const bills = await Billing.find({ patientID: patientID });
    if (bills.length === 0) {
      return res.status(404).json({ error: "No bills found for this patient" });
    }
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a billing record by Bill No
exports.getBillByBillNo = async (req, res) => {
  try {
    const { billNo } = req.params;
    const billing = await Billing.findOne({ billNo: billNo });
    if (!billing) {
      return res.status(404).json({ error: "Billing record not found" });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBillsByHospitalId = async (req, res) => {
  try {
    const { hospitalID } = req.params;
    const bills = await Billing.find({
      hospitalMongoID: hospitalID,
    });
    if (bills.length === 0) {
      return res
        .status(404)
        .json({ error: "No bills found for this hospital" });
    }
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending bills by hospital ID
exports.getPendingBillsByHospitalId = async (req, res) => {
  try {
    const { hospitalID } = req.params;
    const pendingBills = await Billing.find({
      hospitalMongoID: hospitalID,
      paymentStatus: "Pending",
    });
    if (pendingBills.length === 0) {
      return res
        .status(404)
        .json({ error: "No pending bills found for this hospital" });
    }
    res.status(200).json(pendingBills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get Bill By Appointment ID  
// Get a billing record by Appointment ID
exports.getBillByAppointmentId = async (req, res) => {
  try {
    const { appointmentID } = req.params;
    
    // Find the billing record using the appointmentID
    const billing = await Billing.findOne({ appointmentID: appointmentID });

    // If no billing record is found, return a 404 error
    if (!billing) {
      return res.status(404).json({ error: "Billing record not found for this appointment" });
    }

    // If the billing record is found, return it in the response
    res.status(200).json(billing);
  } catch (error) {
    // In case of an error, return a 500 status code with the error message
    res.status(500).json({ error: error.message });
  }
};

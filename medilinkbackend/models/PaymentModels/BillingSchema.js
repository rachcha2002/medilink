const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
  billingType: {
    type: String,
    required: true,
    enum: ["Channeling", "Admission", "Scan", "Lab Test"],
  },
  patientName: {
    type: String,
    required: true,
  },
  patientID: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    
  },
  patientEmail: {
    type: String,
    required: true,
    
  },
  hospitalName: {
    type: String,
    default: "MediLink Hospital",
  },
  hospitalID: {
    type: String,
    default: "HOSP12345",
  },
  serviceDetails: [
    {
      description: {
       
       
      },
      cost: {
        type: Number,
       
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "Card", "Insurance"],
  },
  paymentStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Paid"],
  },
}, { timestamps: true });

const Billing = mongoose.model("Billing", BillingSchema);

module.exports = Billing;

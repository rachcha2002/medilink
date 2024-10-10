const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
  {
    billNo: {
      type: String,
      required: true,
      default: "Bill00000",
    },
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
    hospitalEmail: {
      type: String,
      default: "info@medilinkhospital.com",
    },
    hospitalPhone: {
      type: String,
      default: "011-2345678",
    },
    hospitalAddress: {
      type: String,
      default: "123 Main Street, Colombo, Sri Lanka",
    },
    serviceDetails: [
      {
        description: {
          type: String,
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
      enum: ["Pending", "Paid", "Rejected", "Failed"],
    },
    downloadURL: {
      type: String,
    }
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", BillingSchema);

module.exports = Billing;

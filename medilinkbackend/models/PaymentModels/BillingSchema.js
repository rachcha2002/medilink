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
      enum: ["Channeling", "Admission", "Scan", "Lab Test","Appointment"],
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
     
    },
    hospitalID: {
      type: String,
      
    },
    hospitalEmail: {
      type: String,
      
    },
    hospitalPhone: {
      type: String,
     
    },
    hospitalAddress: {
      type: String,
     
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
    },
    hospitalMongoID: {
      type: String,
    },
    isAppointment: {
      type: Boolean,
      default: false,
    },
    appointmentType:{
      type:String,
      
    },
    appointmentID:{
      type:String,
    }

  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", BillingSchema);

module.exports = Billing;

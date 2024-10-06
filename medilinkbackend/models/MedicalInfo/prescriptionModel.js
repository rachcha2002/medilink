const mongoose = require("mongoose");
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  patientId: {
    type: String, // Optional, only if applicable
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAge: {
    type: String, // Can store either age or date of birth
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  medications: [
    {
      drugName: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    },
  ],
  remarks: {
    type: String,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;

const mongoose = require("mongoose");

// Define the PatientProfile schema
const patientProfileSchema = new mongoose.Schema({
  patientID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
    trim: true,
  },
  currentDiagnoses: {
    type: String,
    default: "No current diagnoses",
  },
  currentMedications: {
    type: String,
    default: "No current medications",
  },
  allergies: {
    type: String,
    default: "No allergies",
  },
  photoURL: {
    type: String, // URL to the uploaded photo
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleated: {
    type: Boolean,
    default: false,
  },
});

// Compile the schema into a model
const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

module.exports = PatientProfile;

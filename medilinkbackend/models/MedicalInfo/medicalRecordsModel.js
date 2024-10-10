const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalRecordSchema = new Schema({
  mrId: {
    type: String,
    required: true, // Unique ID for the medical record
    unique: true,
  },
  patientId: {
    type: String,
    required: true, // Unique ID for the patient
  },
  patientName: {
    type: String,
    required: true, // Patient's full name
  },
  patientAge: {
    type: String, // Can be either age or date of birth
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Optional field for gender
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Date when the record was created
  },
  doctorName: {
    type: String,
    required: true, // Name of the doctor who issued the report
  },
  doctorId: {
    type: String,
    required: true, // Doctor's unique ID
  },
  hospital: {
    type: String,
    required: true, // Hospital or medical center name
  },
  diagnosis: {
    type: String, // Diagnosis provided by the doctor
    required: true,
  },
  symptoms: {
    type: String, // Array of symptoms reported by the patient
    required: true,
  },
  medicalDocument: {
    fileName: {
      type: String, // Name of the PDF document
    },
    fileUrl: {
      type: String, // URL or path to the PDF file
      required: true,
    },
    uploadedDate: {
      type: Date, // Date the PDF was uploaded
      default: Date.now,
    },
  },
  remarks: {
    type: String, // Any additional remarks or observations
  },
  createdBy: {
    type: String, // ID of the user who created the record
    required: true,
  },
  createdByPosition: {
    // Position of the user who created the record
    type: String,
    required: true,
  },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;

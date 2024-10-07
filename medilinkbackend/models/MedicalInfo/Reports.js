const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common fields for both Lab and Radiology Reports
const reportSchema = {
  reportId: { type: String, required: true },
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  patientContact: { type: String, required: true },
  doctor: { type: String, required: true },
  hospital: { type: String, required: true },
  reportType: {
    type: String,
    required: true,
    enum: ["laboratory", "radiology"],
  },
  labName: { type: String, required: true },
  labContact: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, required: true },
  resultPdf: { type: String, required: true }, // URL of the PDF in Firebase Storage
  firebaseFileName: { type: String, required: true }, // File name in Firebase Storage
  remarks: { type: String },
};

// Lab Report Schema
const labReportSchema = new Schema({
  ...reportSchema,
  laboratoristId: { type: String, required: true },
  laboratoristName: { type: String, required: true },
});

// Radiology Report Schema
const radiologyReportSchema = new Schema({
  ...reportSchema,
  radiologistId: { type: String, required: true },
  radiologistName: { type: String, required: true },
});

const LabReport = mongoose.model("LabReport", labReportSchema);
const RadiologyReport = mongoose.model(
  "RadiologyReport",
  radiologyReportSchema
);

module.exports = { LabReport, RadiologyReport };

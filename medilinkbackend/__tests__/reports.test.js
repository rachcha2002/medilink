const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { LabReport, RadiologyReport } = require("../models/MedicalInfo/Reports");
const reportController = require("../controllers/MedicalInfoControllers/reportController");
const ReportFactory = require("../factory/reportFactory");

const app = express();
app.use(express.json());

app.post("/reports", reportController.createReportWithFile);
app.get("/reports", reportController.getAllReports);
app.get("/reports/:reportType/:id", reportController.getReportById);
app.get("/reports/hospital/:hospital", reportController.getReportsByHospital);
app.get(
  "/reports/laboratorist/:laboratoristId",
  reportController.getReportsByLaboratoristId
);
app.get(
  "/reports/radiologist/:radiologistId",
  reportController.getReportsByRadiologistId
);
app.get("/reports/patient/:patientId", reportController.getReportsByPatientId);
app.put("/reports/:reportType/:id", reportController.updateReportById);
app.delete("/reports/:reportType/:id", reportController.deleteReportById);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Report Controller", () => {
  // Positive Test Case: Get all reports
  it("should get all lab and radiology reports", async () => {
    const response = await request(app).get("/reports");
    expect(response.status).toBe(200);
    expect(response.body.labReports).toBeDefined();
    expect(response.body.radiologyReports).toBeDefined();
  });

  // Positive Test Case: Get report by ID
  it("should get a lab report by ID", async () => {
    const report = new LabReport({
      reportType: "laboratory",
      reportId: "R00000001",
      patientId: "P001",
      patientName: "John Doe",
      age: 45,
      patientContact: "0771234567",
      doctor: "Dr. Smith",
      hospital: "General Hospital",
      labName: "Central Lab",
      labContact: "0112345678",
      testName: "Blood Test",
      date: new Date(),
      laboratoristId: "L001",
      laboratoristName: "Lab Tech",
      resultPdf: "url_to_pdf",
      firebaseFileName: "filename_in_firebase",
      remarks: "No issues found",
    });
    await report.save();

    const response = await request(app).get(
      `/reports/laboratory/${report._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.patientName).toBe("John Doe");
  });

  // Negative Test Case 1: Create report without required fields
  it("should return 400 when required fields are missing", async () => {
    const response = await request(app).post("/reports").send({
      reportType: "laboratory",
      patientId: "P001", // Missing required fields
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("No file uploaded");
  });

  // Negative Test Case 2: Get report by invalid ID
  it("should return 404 when report is not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/reports/laboratory/${invalidId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Report not found");
  });

  // Negative Test Case 3: Update a report with duplicate testName and date
  it("should return 400 when updating a report to a duplicate testName and date", async () => {
    const report1 = new LabReport({
      reportType: "laboratory",
      reportId: "R00000001",
      patientId: "P001",
      patientName: "John Doe",
      age: 45,
      patientContact: "0771234567",
      doctor: "Dr. Smith",
      hospital: "General Hospital",
      labName: "Central Lab",
      labContact: "0112345678",
      testName: "Blood Test",
      date: new Date(),
      laboratoristId: "L001",
      laboratoristName: "Lab Tech",
      resultPdf: "url_to_pdf",
      firebaseFileName: "filename_in_firebase",
      remarks: "No issues found",
    });
    await report1.save();

    const report2 = new LabReport({
      reportType: "laboratory",
      reportId: "R00000002",
      patientId: "P002",
      patientName: "Jane Doe",
      age: 30,
      patientContact: "0771234568",
      doctor: "Dr. Smith",
      hospital: "General Hospital",
      labName: "Central Lab",
      labContact: "0112345678",
      testName: "Urine Test",
      date: new Date(),
      laboratoristId: "L002",
      laboratoristName: "Lab Tech",
      resultPdf: "url_to_pdf",
      firebaseFileName: "filename_in_firebase",
      remarks: "No issues found",
    });
    await report2.save();

    const response = await request(app)
      .put(`/reports/laboratory/${report2._id}`)
      .send({
        testName: "Blood Test", // Duplicate with report1
        date: report1.date,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Another report with the same testName, date, and type already exists"
    );
  });
});

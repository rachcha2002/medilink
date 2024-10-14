const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Prescription = require("../models/MedicalInfo/prescriptionModel");
const prescriptionController = require("../controllers/MedicalInfoControllers/prescription-controller");

const app = express();
app.use(express.json());

app.post("/prescription", prescriptionController.createPrescription);
app.get("/prescription", prescriptionController.getAllPrescriptions);
app.get("/prescription/:id", prescriptionController.getPrescriptionById);
app.put("/prescription/:id", prescriptionController.updatePrescription);
app.delete("/prescription/:id", prescriptionController.deletePrescriptionById);
app.get(
  "/prescription/hospital/:hospital",
  prescriptionController.getPrescriptionsByHospital
);
app.get(
  "/prescription/doctor/:doctorId",
  prescriptionController.getPrescriptionsByDoctorId
);
app.get(
  "/prescription/patient/:patientId",
  prescriptionController.getPrescriptionsByPatientId
);

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

describe("Prescription Controller", () => {
  // Positive Test Case: Create a new prescription
  it("should create a new prescription", async () => {
    const response = await request(app)
      .post("/prescription")
      .send({
        patientId: "12345",
        patientName: "John Doe",
        patientAge: "30",
        date: new Date(),
        doctorName: "Dr. Smith",
        doctorId: "DR001",
        hospital: "General Hospital",
        doctorEmail: "drsmith@hospital.com",
        medications: [
          {
            drugName: "Drug A",
            dosage: "500mg",
            frequency: "twice daily",
            duration: "7 days",
          },
        ],
        remarks: "Take with food",
      });

    expect(response.status).toBe(201);
    expect(response.body.patientName).toBe("John Doe");
    expect(response.body.doctorName).toBe("Dr. Smith");
  });

  // Positive Test Case: Get all prescriptions
  it("should get all prescriptions", async () => {
    const response = await request(app).get("/prescription");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Positive Test Case: Get a prescription by ID
  it("should get a prescription by ID", async () => {
    const prescription = new Prescription({
      patientId: "12345",
      patientName: "John Doe",
      patientAge: "30",
      date: new Date(),
      doctorName: "Dr. Smith",
      doctorId: "DR001",
      hospital: "General Hospital",
      doctorEmail: "drsmith@hospital.com",
      medications: [
        {
          drugName: "Drug A",
          dosage: "500mg",
          frequency: "twice daily",
          duration: "7 days",
        },
      ],
      remarks: "Take with food",
    });
    await prescription.save();

    const response = await request(app).get(
      `/prescription/${prescription._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.patientName).toBe("John Doe");
  });

  // Positive Test Case: Update a prescription by ID
  it("should update a prescription by ID", async () => {
    const prescription = new Prescription({
      patientId: "12345",
      patientName: "John Doe",
      patientAge: "30",
      date: new Date(),
      doctorName: "Dr. Smith",
      doctorId: "DR001",
      hospital: "General Hospital",
      doctorEmail: "drsmith@hospital.com",
      medications: [
        {
          drugName: "Drug A",
          dosage: "500mg",
          frequency: "twice daily",
          duration: "7 days",
        },
      ],
      remarks: "Take with food",
    });
    await prescription.save();

    const response = await request(app)
      .put(`/prescription/${prescription._id}`)
      .send({
        patientName: "Jane Doe", // Updating patient name
      });

    expect(response.status).toBe(200);
    expect(response.body.patientName).toBe("Jane Doe");
  });

  // Positive Test Case: Delete a prescription by ID
  it("should delete a prescription by ID", async () => {
    const prescription = new Prescription({
      patientId: "12345",
      patientName: "John Doe",
      patientAge: "30",
      date: new Date(),
      doctorName: "Dr. Smith",
      doctorId: "DR001",
      hospital: "General Hospital",
      doctorEmail: "drsmith@hospital.com",
      medications: [
        {
          drugName: "Drug A",
          dosage: "500mg",
          frequency: "twice daily",
          duration: "7 days",
        },
      ],
      remarks: "Take with food",
    });
    await prescription.save();

    const response = await request(app).delete(
      `/prescription/${prescription._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Prescription deleted successfully");
  });

  // Negative Test Case 1: Create a prescription with missing required fields
  it("should not create a prescription when required fields are missing", async () => {
    const response = await request(app).post("/prescription").send({
      patientName: "John Doe", // Missing required fields such as patientId, doctorName, etc.
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error creating prescription");
  });

  // Negative Test Case 2: Get a prescription with an invalid ID
  it("should return 404 when prescription is not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/prescription/${invalidId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Prescription not found");
  });

  // Negative Test Case: Update a prescription with invalid fields
  /*it("should return 400 when updating prescription with invalid data", async () => {
    // Create a valid prescription object
    const prescription = new Prescription({
      patientId: "12345",
      patientName: "John Doe",
      patientAge: "30",
      date: new Date(),
      doctorName: "Dr. Smith",
      doctorId: "DR001",
      hospital: "General Hospital",
      doctorEmail: "drsmith@hospital.com",
      medications: [
        {
          drugName: "Drug A",
          dosage: "500mg",
          frequency: "twice daily",
          duration: "7 days",
        },
      ],
      remarks: "Take with food",
    });

    // Save the prescription to the database
    await prescription.save();

    // Send a PUT request with invalid data (empty doctorEmail)
    const response = await request(app)
      .put(`/prescription/${prescription._id}`) // Make sure the ID is correct
      .send({
        doctorEmail: "", // Invalid: doctorEmail cannot be empty
      });

    // Expect a 400 status and specific error message
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Error updating prescription");
  });*/
});

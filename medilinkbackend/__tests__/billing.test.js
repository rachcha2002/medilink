const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Billing = require('../models/PaymentModels/BillingSchema');
const billingController = require('../controllers/PaymentControllers/Billing');

const app = express();
app.use(express.json());

app.post('/billing', billingController.createBilling);
app.get('/billing', billingController.getAllBillings);
app.get('/billing/:id', billingController.getBillingById);
app.put('/billing/:id', billingController.updateBilling);
app.delete('/billing/:id', billingController.deleteBilling);
app.get('/billing/pending', billingController.getPendingPayments);
app.get('/billing/patient/:patientID', billingController.getBillsByPatientId);
app.get('/billing/billNo/:billNo', billingController.getBillByBillNo);
app.get('/billing/hospital/:hospitalID/pending', billingController.getPendingBillsByHospitalId);
app.get('/billing/appointment/:appointmentID', billingController.getBillByAppointmentId);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Billing Controller', () => {

  // Positive Test Case 1: Create a new billing record
  it('should create a new billing record (Positive)', async () => {
    const response = await request(app)
      .post('/billing')
      .send({
        patientID: '12345',
        patientName: 'John Doe',
        contactNumber: '0771234567',
        patientEmail: 'johndoe@example.com',
        billingType: 'Channeling',
        totalAmount: 1000,
        paymentMethod: 'Cash',
        paymentStatus: 'Pending',
        billNo: '001',
      });
    expect(response.status).toBe(201);
    expect(response.body.patientID).toBe('12345');
    expect(response.body.paymentStatus).toBe('Pending');
  });

  // Positive Test Case 2: Get all billing records
  it('should get all billing records (Positive)', async () => {
    const response = await request(app).get('/billing');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Positive Test Case 3: Get a billing record by ID
  it('should get a billing record by ID (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '002',
    });
    await billing.save();

    const response = await request(app).get(`/billing/${billing._id}`);
    expect(response.status).toBe(200);
    expect(response.body.patientID).toBe('12345');
  });

  // Positive Test Case 4: Delete a billing record by ID
  it('should delete a billing record by ID (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '003',
    });
    await billing.save();

    const response = await request(app).delete(`/billing/${billing._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Billing record deleted successfully');
  });

  

  // Positive Test Case 6: Get bills by patient ID
  it('should get bills by patient ID (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '005',
    });
    await billing.save();

    const response = await request(app).get(`/billing/patient/12345`);
    expect(response.status).toBe(200);
    expect(response.body[0].patientID).toBe('12345');
  });

  // Positive Test Case 7: Get a billing record by Bill No
  it('should get a billing record by Bill No (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '006',
    });
    await billing.save();

    const response = await request(app).get(`/billing/billNo/006`);
    expect(response.status).toBe(200);
    expect(response.body.billNo).toBe('006');
  });

  // Positive Test Case 8: Update a billing record successfully
  it('should update a billing record successfully (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '007',
    });
    await billing.save();

    const response = await request(app)
      .put(`/billing/${billing._id}`)
      .send({
        patientName: 'Jane Doe',
        totalAmount: 1200,
      });

    expect(response.status).toBe(200);
    expect(response.body.patientName).toBe('Jane Doe');
    expect(response.body.totalAmount).toBe(1200);
  });

  // Positive Test Case 9: Get pending bills by hospital ID
  it('should get all pending bills by hospital ID (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billNo: '008',
      hospitalMongoID: 'hospital123',
    });
    await billing.save();

    const response = await request(app).get(`/billing/hospital/hospital123/pending`);
    expect(response.status).toBe(200);
    expect(response.body[0].paymentStatus).toBe('Pending');
  });

  // Positive Test Case 10: Get a billing record by appointment ID
  it('should get a billing record by appointment ID (Positive)', async () => {
    const billing = new Billing({
      patientID: '12345',
      patientName: 'John Doe',
      contactNumber: '0771234567',
      patientEmail: 'johndoe@example.com',
      billingType: 'Channeling',
      totalAmount: 1000,
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      appointmentID: 'appoint001',
    });
    await billing.save();

    const response = await request(app).get(`/billing/appointment/appoint001`);
    expect(response.status).toBe(200);
    expect(response.body.appointmentID).toBe('appoint001');
  });

  // Negative Test Case 1: Create a billing record with missing required fields
  it('should not create a billing record when required fields are missing (Negative)', async () => {
    const response = await request(app)
      .post('/billing')
      .send({
        patientID: '12345',  // Missing other required fields like patientName, totalAmount, etc.
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('validation failed');
  });

  // Negative Test Case 2: Get a billing record with an invalid ID
  it('should return 404 for a non-existent billing record (Negative)', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/billing/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Billing record not found');
  });


  

  // Negative Test Case 4: Attempt to delete a non-existent billing record
  it('should return 404 when trying to delete a non-existent billing record (Negative)', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/billing/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Billing record not found');
  });

  // Negative Test Case 5: Fail to get pending bills for a non-existent hospital ID
  it('should return 404 when no pending bills are found for the hospital (Negative)', async () => {
    const response = await request(app).get(`/billing/hospital/invalidHospitalID/pending`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('No pending bills found for this hospital');
  });

  // Negative Test Case 6: Fail to get a billing record by non-existent appointment ID
  it('should return 404 when trying to get billing by non-existent appointment ID (Negative)', async () => {
    const response = await request(app).get(`/billing/appointment/invalidAppointmentID`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Billing record not found for this appointment');
  });

  // Negative Test Case 7: Fail to create a billing record with invalid payment status
  it('should return 400 when creating a billing record with invalid payment status (Negative)', async () => {
    const response = await request(app)
      .post('/billing')
      .send({
        patientID: '12345',
        patientName: 'John Doe',
        contactNumber: '0771234567',
        patientEmail: 'johndoe@example.com',
        billingType: 'Channeling',
        totalAmount: 1000,
        paymentMethod: 'Cash',
        paymentStatus: 'UnknownStatus',  // Invalid payment status
        billNo: '010',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('validation failed');
  });

});

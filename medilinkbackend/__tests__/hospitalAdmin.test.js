const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Increase Jest timeout to 30 seconds
jest.setTimeout(35000);

// Import the HospitalAdmin model and controller
const HospitalAdmin = require('../models/Hospital&Admin/HospitalAdminSchema');
const hospitalAdminRoutes = require('../routes/hospitaladminRoutes'); // Adjust the path as necessary

// Initialize Express app
const app = express();
app.use(express.json());

// Use the actual routes
app.use('/', hospitalAdminRoutes);

// Initialize in-memory MongoDB server
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

afterEach(async () => {
  // Clear all data after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('HospitalAdmin Controller', () => {
  // Positive Test Cases

  it('should create a new admin record', async () => {
    const adminData = {
      adminID: 'ADMIN123',
      adminName: 'John Doe',
      adminEmail: 'johndoe@example.com',
      adminContact: '0771234567',
      hospitalName: 'MediLink Hospital',
      registrationID: 'REG123456',
    };

    const response = await request(app)
      .post('/addhospitaladmin')
      .send(adminData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(adminData);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get all admin records', async () => {
    // Create sample admins
    const admins = [
      {
        adminID: 'ADMIN001',
        adminName: 'Alice Smith',
        adminEmail: 'alice@example.com',
        adminContact: '0771111111',
        hospitalName: 'HealthCare Center',
        registrationID: 'REG001',
      },
      {
        adminID: 'ADMIN002',
        adminName: 'Bob Johnson',
        adminEmail: 'bob@example.com',
        adminContact: '0772222222',
        hospitalName: 'Wellness Clinic',
        registrationID: 'REG002',
      },
    ];

    await HospitalAdmin.insertMany(admins);

    const response = await request(app).get('/gethospitaladmins');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toMatchObject(admins[0]);
    expect(response.body[1]).toMatchObject(admins[1]);
  });

  it('should get an admin record by ID', async () => {
    const admin = new HospitalAdmin({
      adminID: 'ADMIN003',
      adminName: 'Charlie Brown',
      adminEmail: 'charlie@example.com',
      adminContact: '0773333333',
      hospitalName: 'CarePlus Hospital',
      registrationID: 'REG003',
    });
    await admin.save();

    const response = await request(app).get(`/gethospitaladmin/${admin._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      adminID: 'ADMIN003',
      adminName: 'Charlie Brown',
      adminEmail: 'charlie@example.com',
      adminContact: '0773333333',
      hospitalName: 'CarePlus Hospital',
      registrationID: 'REG003',
    });
  });

  it('should update an admin record by ID', async () => {
    const admin = new HospitalAdmin({
      adminID: 'ADMIN004',
      adminName: 'Diana Prince',
      adminEmail: 'diana@example.com',
      adminContact: '0774444444',
      hospitalName: 'Heroic Health',
      registrationID: 'REG004',
    });
    await admin.save();

    const updatedData = {
      adminName: 'Diana Prince-Wayne',
      adminEmail: 'diana.wayne@example.com',
    };

    const response = await request(app)
      .put(`/updateadmin/${admin._id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.adminName).toBe('Diana Prince-Wayne');
    expect(response.body.adminEmail).toBe('diana.wayne@example.com');
    // Ensure other fields remain unchanged
    expect(response.body.adminID).toBe('ADMIN004');
    expect(response.body.adminContact).toBe('0774444444');
    expect(response.body.hospitalName).toBe('Heroic Health');
    expect(response.body.registrationID).toBe('REG004');
  });

  it('should delete an admin record by ID', async () => {
    const admin = new HospitalAdmin({
      adminID: 'ADMIN005',
      adminName: 'Ethan Hunt',
      adminEmail: 'ethan@example.com',
      adminContact: '0775555555',
      hospitalName: 'Mission Health',
      registrationID: 'REG005',
    });
    await admin.save();

    const response = await request(app).delete(`/deletehospitaladmin/${admin._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admin record deleted successfully');

    // Verify deletion
    const deletedAdmin = await HospitalAdmin.findById(admin._id);
    expect(deletedAdmin).toBeNull();
  });

  // Negative Test Cases

  // Negative Test Case 1: Create an admin with missing required fields
  it('should not create an admin record when required fields are missing', async () => {
    const incompleteAdminData = {
      adminID: 'ADMIN006',
      // Missing adminName, adminEmail, adminContact
      hospitalName: 'Incomplete Health',
      registrationID: 'REG006',
    };

    const response = await request(app)
      .post('/addhospitaladmin')
      .send(incompleteAdminData);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/HospitalAdminDetails validation failed/);
    expect(response.body.error).toMatch(/adminName: Path `adminName` is required/);
    expect(response.body.error).toMatch(/adminEmail: Path `adminEmail` is required/);
    expect(response.body.error).toMatch(/adminContact: Path `adminContact` is required/);
  });

  // Negative Test Case 2: Get an admin with a non-existent ID
  it('should return 404 when retrieving a non-existent admin record', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/gethospitaladmin/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Admin record not found');
  });

  // Negative Test Case 3: Update an admin with invalid data
  it('should return 400 when updating an admin record with invalid data', async () => {
    const admin = new HospitalAdmin({
      adminID: 'ADMIN007',
      adminName: 'Frank Castle',
      adminEmail: 'frank@example.com',
      adminContact: '0776666666',
      hospitalName: 'Punisher Health',
      registrationID: 'REG007',
    });
    await admin.save();

    const invalidUpdateData = {
      adminName: '', // Invalid: adminName cannot be empty
     // adminEmail: 'invalid-email', // Assuming no email format validation, adjust if necessary
      //adminContact: 'invalid-contact', // Assuming no contact format validation, adjust if necessary
    };

    const response = await request(app)
      .put(`/updateadmin/${admin._id}`)
      .send(invalidUpdateData);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/Validation failed/);
    expect(response.body.error).toMatch(/adminName: Path `adminName` is required/);
   // expect(response.body.error).toMatch(/adminEmail: Path `adminEmail` is required/);
   // expect(response.body.error).toMatch(/adminContact: Path `adminContact` is required/);
  });

  // Additional Negative Test Case 4: Delete an admin with an invalid ID format
  it('should return 500 when deleting an admin record with an invalid ID format', async () => {
    const invalidId = '12345'; // Not a valid ObjectId

    const response = await request(app).delete(`/deletehospitaladmin/${invalidId}`);

    expect(response.status).toBe(500);
    expect(response.body.error).toMatch(/Cast to ObjectId failed/);
  });
});
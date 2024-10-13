const app = require('../app'); // Import your app (without calling app.listen)
const AppointmentFactory = require('../factory/appointmentfactory');
const { ClinicAppointment, ChannellingAppointment, ScanandTestAppointment } = require('../models/Appointments/appointmentModel');
const { default: axios } = require('axios');

// Mock the models to avoid making real database calls
jest.mock('../models/Appointments/appointmentModel');

beforeEach(() => {
    ClinicAppointment.mockClear();
    ChannellingAppointment.mockClear();
    ScanandTestAppointment.mockClear();
});

describe('Appointment Management System', () => {
    // Positive test cases
    test('Should create a clinic appointment successfully', async () => {
        ClinicAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '1', doctorName: 'Dr. Smith' }),
        }));

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'clinic',
            doctorName: 'Dr. Smith',
            speciality: 'Psychologist'
        });

        expect(res.status).toEqual(201);
        expect(res.data.message).toBe('clinic appointment created successfully');
        expect(res.data.appointment).toHaveProperty('doctorName', 'Dr. Smith');
    });

    test('Should create a channeling appointment successfully', async () => {
        ChannellingAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '2', doctorName: 'Dr. John' }),
        }));

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'channeling',
            doctorName: 'Dr. John',
            speciality: 'Cardiologist'
        });

        expect(res.status).toEqual(201);
        expect(res.data.message).toBe('channeling appointment created successfully');
        expect(res.data.appointment).toHaveProperty('doctorName', 'Dr. John');
    });

    test('Should create a scan/test appointment successfully', async () => {
        ScanandTestAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '3', scanType: 'Blood Test' }),
        }));

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'testscan',
            scanType: 'Blood Test',
            scanName: 'Full Blood Count'
        });

        expect(res.status).toEqual(201);
        expect(res.data.message).toBe('testscan appointment created successfully');
        expect(res.data.appointment).toHaveProperty('scanType', 'Blood Test');
    });

    // Negative test cases
    test('Should throw an error when an invalid appointment type is provided', async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'invalidType',
            doctorName: 'Dr. Invalid'
        });

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
    });

    test('Should fail to create an appointment if required fields are missing', async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'clinic'
        });

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
    });

    test('Should handle database errors gracefully', async () => {
        ClinicAppointment.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('Database error')),
        }));

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'clinic',
            doctorName: 'Dr. Smith',
            speciality: 'Psychologist'
        });

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
        expect(res.data.error).toBe('Database error');
    });
});

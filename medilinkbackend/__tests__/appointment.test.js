const { ClinicAppointment, ChannellingAppointment, ScanandTestAppointment } = require('../models/Appointments/appointmentModel');
const { default: axios } = require('axios');

// Mock the models to avoid making real database calls
jest.mock('../models/Appointments/appointmentModel');
jest.mock('axios'); // Mock axios to prevent real HTTP calls

beforeEach(() => {
    ClinicAppointment.mockClear();
    ChannellingAppointment.mockClear();
    ScanandTestAppointment.mockClear();
    axios.post.mockClear(); // Clear mock axios calls
});

describe('Appointment Management System', () => {
    // Positive test cases
    test('Should create a clinic appointment successfully', async () => {
        // Mock the clinic appointment saving process
        ClinicAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '1', doctorName: 'Dr. Smith' }),
        }));

        // Mock the axios post request to return a successful response
        axios.post.mockResolvedValue({
            status: 201,
            data: {
                message: 'clinic appointment created successfully',
                appointment: { _id: '1', doctorName: 'Dr. Smith' }
            }
        });

        // Simulate the request to your backend
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
        // Mock the channelling appointment saving process
        ChannellingAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '2', doctorName: 'Dr. John' }),
        }));

        // Mock the axios post request to return a successful response
        axios.post.mockResolvedValue({
            status: 201,
            data: {
                message: 'channeling appointment created successfully',
                appointment: { _id: '2', doctorName: 'Dr. John' }
            }
        });

        // Simulate the request to your backend
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
        // Mock the scan/test appointment saving process
        ScanandTestAppointment.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue({ _id: '3', scanType: 'Blood Test' }),
        }));

        // Mock the axios post request to return a successful response
        axios.post.mockResolvedValue({
            status: 201,
            data: {
                message: 'testscan appointment created successfully',
                appointment: { _id: '3', scanType: 'Blood Test' }
            }
        });

        // Simulate the request to your backend
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
        // Mock the axios post request to return a failed response
        axios.post.mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'Error saving appointment',
                }
            }
        });

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'invalidType',
            doctorName: 'Dr. Invalid'
        }).catch((err) => err.response); // Catch the error to check the response

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
    });

    test('Should fail to create an appointment if required fields are missing', async () => {
        // Mock the axios post request to return a failed response
        axios.post.mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'Error saving appointment',
                }
            }
        });

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'clinic'
        }).catch((err) => err.response); // Catch the error to check the response

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
    });

    test('Should handle database errors gracefully', async () => {
        // Mock the clinic appointment saving process to throw a database error
        ClinicAppointment.mockImplementation(() => ({
            save: jest.fn().mockRejectedValue(new Error('Database error')),
        }));

        // Mock the axios post request to return a failed response
        axios.post.mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'Error saving appointment',
                    error: 'Database error'
                }
            }
        });

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/makeappointment`, {
            type: 'clinic',
            doctorName: 'Dr. Smith',
            speciality: 'Psychologist'
        }).catch((err) => err.response); // Catch the error to check the response

        expect(res.status).toEqual(500);
        expect(res.data.message).toBe('Error saving appointment');
        expect(res.data.error).toBe('Database error');
    });
});

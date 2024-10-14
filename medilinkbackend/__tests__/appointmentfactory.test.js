// Import AppointmentFactory and models
const AppointmentFactory = require('../factory/appointmentfactory');
const { ClinicAppointment, ChannellingAppointment, ScanandTestAppointment } = require('../models/Appointments/appointmentModel');

// Positive test case 1: ClinicAppointment
test('should return ClinicAppointment model for clinic type', () => {
  const model = AppointmentFactory.getModel('clinic');
  expect(model).toBe(ClinicAppointment);
});

// Positive test case 2: ChannellingAppointment
test('should return ChannellingAppointment model for channeling type', () => {
  const model = AppointmentFactory.getModel('channeling');
  expect(model).toBe(ChannellingAppointment);
});

// Positive test case 3: ScanandTestAppointment
test('should return ScanandTestAppointment model for testscan type', () => {
  const model = AppointmentFactory.getModel('testscan');
  expect(model).toBe(ScanandTestAppointment);
});

// Negative test case: Invalid Appointment Type
test('should throw an error for an invalid appointment type', () => {
  expect(() => AppointmentFactory.getModel('invalidType')).toThrow('Invalid report type');
});

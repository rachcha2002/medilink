const {ClinicAppointment, ChannellingAppointment, ScanandTestAppointment} = require("../models/Appointments/appointmentModel")

class appointmentfactory{
    static createAppointment(type, data) {
        if (type === 'clinic' || type === 'channeling') {
          return new Appointment({ ...data, doctorName: data.doctorName, speciality: data.speciality });
        } else if (type === 'testscan') {
          return new Appointment({ ...data, scanType: data.scanType,scanName:data.scanName });
        }
        throw new Error('Invalid appointment type');
      }

    static getModel(type) {
        switch (type.toLowerCase()) {
          case "clinic":
            return ClinicAppointment;
          case "channeling":
            return ChannellingAppointment;
          case "testscan":
            return ScanandTestAppointment;
          default:
            throw new Error("Invalid report type");
        }
      }
    }


module.exports =  appointmentfactory;
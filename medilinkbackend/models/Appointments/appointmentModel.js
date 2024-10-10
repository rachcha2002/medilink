const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema ={
    userid: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    mobile:{type:Number, required:true},
    appointmentDate: {type:Date, required:true},
    appointmentTime:{type:String,required:true },
    hospitalId:{type:String, required:true},
    hospitalType:{type:String, required:true},
    hospitalName:{type:String,required:true},
    status:{type:String,required:true},
    payment:{type:String,default:""},
}

const clinicAppointmentSchema = new Schema({
    ...appointmentSchema,
    doctorName:{type:String, required:true},
    speciality: {type: String,required: true,},
})

const channellingAppointmentSchema = new Schema({
    ...appointmentSchema,
    doctorName:{type:String, required:true},
    speciality: {type: String,required: true,},
})

const scanandTestAppointmentSchema = new Schema({
    ...appointmentSchema,
    scanType:{type:String, required:true},
    scanName:{type:String, required:true},
})

const ClinicAppointment = mongoose.model("ClinicAppointment", clinicAppointmentSchema);
const ChannellingAppointment = mongoose.model("ChannellingAppointment", channellingAppointmentSchema);
const ScanandTestAppointment = mongoose.model("ScanandTestAppointment", scanandTestAppointmentSchema);

module.exports = { ClinicAppointment, ChannellingAppointment, ScanandTestAppointment };
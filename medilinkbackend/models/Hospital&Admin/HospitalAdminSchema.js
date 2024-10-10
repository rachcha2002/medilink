const mongoose = require("mongoose");

const HospitalAdminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true,
      },
    adminName: {
        type: String,
        required: true,
      },
    adminEmail: {
        type: String,
        required: true,
      },
    adminContact: {
        type: String,
        required: true, 
      },
      hospitalName: {
        type: String,
      },
    registrationID: {
        type: String,
      },
    
}, { timestamps: true });

const HospitalAdmin = mongoose.model("HospitalAdminDetails", HospitalAdminSchema);

module.exports = HospitalAdmin;
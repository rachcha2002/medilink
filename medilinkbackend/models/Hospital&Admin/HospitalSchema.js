const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
      },
    registrationID: {
        type: String,
        required: true,
      },
    address: {
        type: String,
        required: true,
      },
    contactNumber: {
        type: String,
        required: true, 
      },
    hospitalEmail: {
        type: String,
        required: true,
      },
    hospitalType: {
        type: String,
        required: true,
        enum: ["government", "private", "medicenter", "labarotary"],
      },
    imageURL: {
        type: String,
        required: false,
      },
    tests: [
        {
          test_heading: {
        }, 
        },
      ],
    scans: [
        {
          scan_heading: {
        }, 
        },
      ],
      adminID: {
        type: String,
        required: true,
      },
}, { timestamps: true });

const Hospital = mongoose.model("HospitalDetails", HospitalSchema);

module.exports = Hospital;
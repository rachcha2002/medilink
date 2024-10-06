const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // UUID for nurseId

const nurseSchema = new mongoose.Schema({
  nurseId: {
    type: String,
    default: uuidv4, // Automatically generate UUID for each nurse
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
    match: /^(?:\d{9}[vV]|\d{12})$/,
  },
  contactNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  password: {
    type: String,
    required: true,
  },
  hospital: {
    type: String, // To store the hospital name or ID
    required: true,
  },
  photoUrl: {
    type: String, // To store the photo URL if necessary
  },
});

const Nurse = mongoose.model("Nurse", nurseSchema);

module.exports = Nurse;

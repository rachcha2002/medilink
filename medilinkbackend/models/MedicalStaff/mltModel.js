const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // UUID for doctorId

const mltSchema = new mongoose.Schema(
  {
    mltId: {
      type: String,
      default: uuidv4, // Automatically generate UUID for each doctor
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    nic: {
      type: String,
      required: [true, "NIC is required"],
      unique: true, // ensures NIC uniqueness in the database
      match: [/^(?:\d{9}[vV]|\d{12})$/, "Invalid NIC format"],
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[0-9]{10}$/, "Contact No. must be a 10-digit number"],
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      enum: ["Radiology", "Laboratory"],
    },
    speciality: {
      type: String,
      required: [true, "Speciality is required"],
    },
    photoUrl: {
      type: String, // To store the photo URL if necessary
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Invalid email address",
      ],
      unique: true, // ensures email uniqueness in the database
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    hospital: {
      type: String,
      default: "Medihelp", // Default value for hospital
    },
  },
  { timestamps: true }
); // adds createdAt and updatedAt fields

module.exports = mongoose.model("MLTStaff", mltSchema);

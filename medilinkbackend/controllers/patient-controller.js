const PatientProfile = require("../models/Patient/patient");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseApp = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Initialize Firebase storage using the app from your Firebase config
const storage = getStorage(firebaseApp);

// Generate unique patient ID in the format "P00000000"
const generatePatientID = async () => {
  const latestProfile = await PatientProfile.findOne().sort({ patientID: -1 });
  let newID = "P00000001"; // Default first patient ID

  if (latestProfile && latestProfile.patientID) {
    const lastID = parseInt(latestProfile.patientID.substring(1)); // Remove the "P" and convert to an integer
    newID = "P" + String(lastID + 1).padStart(8, "0"); // Increment ID and pad with leading zeros
  }
  return newID;
};

// Upload file to Firebase Storage
const uploadFileToFirebase = async (file) => {
  const storageRef = ref(storage, `patient-photos/${uuidv4()}`); // Create a reference for the file in Firebase Storage

  const metadata = {
    contentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    uploadBytes(storageRef, file.buffer, metadata)
      .then(async (snapshot) => {
        // Get the download URL after the file has been uploaded
        const downloadURL = await getDownloadURL(snapshot.ref);
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Create a new patient profile
exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      idNumber,
      address,
      emergencyContact,
      medicalHistory,
      currentDiagnoses,
      currentMedications,
      allergies,
      password, // Include password field
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    const patientID = await generatePatientID();

    // Upload photo to Firebase
    let photoURL = "";
    if (req.file) {
      photoURL = await uploadFileToFirebase(req.file);
    }

    const patientProfile = new PatientProfile({
      patientID,
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      idNumber,
      address,
      emergencyContact,
      medicalHistory,
      currentDiagnoses,
      currentMedications,
      allergies,
      photoURL,
      password: hashedPassword, // Store the hashed password
    });

    await patientProfile.save();

    token = jwt.sign(
      { userId: patientProfile.id, email: patientProfile.email },
      "medilinksecretkey",
      { expiresIn: "1h" }
    );
    console.log(patientProfile,token)
    res.status(201).json({ user: patientProfile, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating patient profile" });
  }
};

// Get all patient profiles
exports.getAll = async (req, res) => {
  try {
    const patients = await PatientProfile.find({ isDeleated: false });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient profiles" });
  }
};

// Get patient profile by ID
exports.getById = async (req, res) => {
  try {
    const patient = await PatientProfile.findOne({
      patientID: req.params.id,
      isDeleated: false,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient profile" });
  }
};

// Update patient profile by ID
exports.updateById = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      idNumber,
      address,
      emergencyContact,
      medicalHistory,
      currentDiagnoses,
      currentMedications,
      allergies,
      password, // Add password in update
    } = req.body;
    console.log(req.body);

    const updateData = {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      idNumber,
      address,
      emergencyContact,
      medicalHistory,
      currentDiagnoses,
      currentMedications,
      allergies,
    };

    // Hash new password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10); // Hash the new password
    }

    // Handle photo upload
    if (req.file) {
      const photoURL = await uploadFileToFirebase(req.file);
      updateData.photoURL = photoURL;
    }

    const updatedPatient = await PatientProfile.findOneAndUpdate(
      { patientID: req.params.id, isDeleated: false },
      updateData,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient profile" });
  }
};

// Update only the current medical information (diagnoses, medications, and allergies) by ID
exports.updateCurrentMedicalById = async (req, res) => {
  try {
    const { currentDiagnoses, currentMedications, allergies } = req.body;

    const updatedPatient = await PatientProfile.findOneAndUpdate(
      { patientID: req.params.id, isDeleated: false },
      { currentDiagnoses, currentMedications, allergies },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating current medical information" });
  }
};

// Soft delete patient profile by ID
exports.deleteById = async (req, res) => {
  try {
    const updatedPatient = await PatientProfile.findOneAndUpdate(
      { patientID: req.params.id },
      { isDeleated: true },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    res.status(200).json({ message: "Patient profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient profile" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;

    if (/^\S+@\S+\.\S+$/.test(email)) {
      user = await PatientProfile.findOne({ email: email });
    } else {
      return res.status(404).json({ message: "Not an email format" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "medilinksecretkey",
      { expiresIn: "1h" }
    );
    console.log(user,token)
    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error });
  }
};

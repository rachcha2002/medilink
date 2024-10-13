// controllers/hospitalController.js

const hospitalService = require("../../services/hospitalService");
const multer = require("multer");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const app = require("../../config/firebase");

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Setting up multer as a middleware to handle image uploads
const upload = multer({ storage: multer.memoryStorage() }).single("hospitalImage"); // The field name should match the one in the form

exports.createHospital = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error("Multer error occurred:", err);
        return res.status(500).json({ error: "Multer error occurred", details: err.message });
      } else if (err) {
        console.error("Unknown error occurred:", err);
        return res.status(500).json({ error: "Unknown error occurred", details: err.message });
      }

      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Generate a unique filename using the current date and time
      const dateTime = new Date().toISOString().replace(/:/g, "-");
      const storageRef = ref(storage, `Hospital&Admin/hospital_details/${req.file.originalname}_${dateTime}`);
      const metadata = { contentType: req.file.mimetype };

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Parse and format test and scan details from request body
      const tests = req.body.tests ? JSON.parse(req.body.tests) : [];
      const scans = req.body.scans ? JSON.parse(req.body.scans) : [];

      // Create a new hospital document with the received form data and the image URL
      const newHospitalData = {
        hospitalName: req.body.hospitalName,
        registrationID: req.body.registrationID,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        hospitalEmail: req.body.hospitalEmail,
        hospitalType: req.body.hospitalType,
        imageURL: downloadURL,
        tests,
        scans,
        adminID: req.body.adminID,
      };

      const savedHospital = await hospitalService.createHospital(newHospitalData);
      const response = {
        message: "New Hospital created successfully.",
        savedHospital,
      };
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating new Hospital:", error);
      return res.status(500).send(error.message);
    }
  });
};

exports.getAllHospitalDetails = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHospitalDetailById = async (req, res) => {
  try {
    const hospital = await hospitalService.getHospitalById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHospitalDetailByAdminId = async (req, res) => {
  try {
    const hospital = await hospitalService.getHospitalByAdminId(req.params.adminID);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHospitalById = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error("Multer error occurred:", err);
        return res.status(500).json({ error: "Multer error occurred", details: err.message });
      } else if (err) {
        console.error("Unknown error occurred:", err);
        return res.status(500).json({ error: "Unknown error occurred", details: err.message });
      }

      // Prepare the update data
      const {
        hospitalName,
        registrationID,
        address,
        contactNumber,
        hospitalEmail,
        hospitalType,
        tests,
        scans,
      } = req.body;

      // Parse tests and scans from request body
      const parsedTests = tests ? JSON.parse(tests) : [];
      const parsedScans = scans ? JSON.parse(scans) : [];

      // Create an object to hold updated fields
      const updateData = {
        hospitalName,
        registrationID,
        address,
        contactNumber,
        hospitalEmail,
        hospitalType,
        tests: parsedTests,
        scans: parsedScans,
      };

      // Check if a new file was uploaded
      if (req.file) {
        // Generate a unique filename using the current date and time
        const dateTime = new Date().toISOString().replace(/:/g, "-");
        const storageRef = ref(storage, `Hospital&Admin/hospital_details/${req.file.originalname}_${dateTime}`);
        const metadata = { contentType: req.file.mimetype };

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        updateData.imageURL = downloadURL; // Add image URL to update data
      }

      const updatedHospital = await hospitalService.updateHospitalById(req.params.id, updateData);
      if (!updatedHospital) {
        return res.status(404).json({ error: "Hospital not found" });
      }
      res.status(200).json(updatedHospital);
    } catch (error) {
      console.error("Error updating Hospital:", error);
      return res.status(500).json({ error: error.message });
    }
  });
};

exports.deleteHospitalById = async (req, res) => {
  try {
    const deletedHospital = await hospitalService.deleteHospitalById(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHospitalByRegistrationID = async (req, res) => {
  try {
    const registrationID = decodeURIComponent(req.params.registrationID);
    const deletedHospital = await hospitalService.deleteHospitalByRegistrationID(registrationID);
    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital and related admins deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Hospital = require("../../models/Hospital&Admin/HospitalSchema");
const HospitalAdmin = require("../../models/Hospital&Admin/HospitalAdminSchema");
const app = require("../../config/firebase");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const multer = require("multer");

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Setting up multer as a middleware to handle image uploads
const upload = multer({ storage: multer.memoryStorage() }).single(
    "hospitalImage"
  ); // The field name should match the one in the form

  exports.createHospital = (req, res) => {
    upload(req, res, async (err) => {
      try {
        if (err instanceof multer.MulterError) {
          console.error("Multer error occurred:", err);
          throw new Error("Multer error occurred");
        } else if (err) {
          console.error("Unknown error occurred:", err);
          throw new Error("Unknown error occurred");
        }
  
        if (!req.file) {
          console.error("No file uploaded");
          throw new Error("No file uploaded");
        }
  
        // Generate a unique filename using the current date and time
        const dateTime = new Date().toISOString().replace(/:/g, "-");
        const storageRef = ref(
          storage,
          `Hospital&Admin/hospital_details/${req.file.originalname}_${dateTime}`
        );
  
        const metadata = {
          contentType: req.file.mimetype,
        };
  
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytesResumable(
          storageRef,
          req.file.buffer,
          metadata
        );
  
        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);
  
        console.log("File successfully uploaded to Firebase Storage.");

         // Parse and format test details from request body
      const tests = req.body.tests
      ? JSON.parse(req.body.tests)
      : [];
       // Parse and format scan details from request body
       const scans = req.body.scans
       ? JSON.parse(req.body.scans)
       : [];
  
        // Create a new hospital document with the received form data and the image URL
        const newHospitalData = {
          hospitalName: req.body.hospitalName,
          registrationID: req.body.registrationID,
          address: req.body.address,
          contactNumber: req.body.contactNumber,
          hospitalEmail: req.body.hospitalEmail,
          hospitalType: req.body.hospitalType,
          imageURL: downloadURL, // Save the Firebase Storage URL
          hospitalType: req.body.hospitalType,
          tests: tests,
          scans:scans
        };
  
        // Save the new hospital to MongoDB
        const newHospital = new Hospital(newHospitalData);
        const savedHospital = await newHospital.save();
  
        const response = {
          message: "New Hospital created successfully.",
          savedHospital,
        };
        console.log("Response:", response);
        return res.status(201).json(response);
      } catch (error) {
        console.error("Error creating new Hospital:", error);
        return res.status(500).send(error.message);
      }
    });
  };

// Get all Hospitals
exports.getAllHospitalDetails = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single Hospital by ID
exports.getHospitalDetailById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Hospital by ID
exports.updateHospitalById = async (req, res) => {
  try {
    const {
      hospitalName,
      registrationID,
      address,
      contactNumber,
      hospitalEmail,
      hospitalType,
      imageURL,
      tests,
      scans
    } = req.body;

    // Find hospital by ID and update
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      {
        hospitalName,
        registrationID,
        address,
        contactNumber,
        hospitalEmail,
        hospitalType,
        imageURL,
        tests, // Assuming tests and scans will be an array of objects with heading
        scans,
      },
      { new: true } // Return the updated document
    );

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    // Respond with the updated hospital document
    res.status(200).json(updatedHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Hospital by ID
exports.deleteHospitalById = async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Hospital by Registration ID
exports.deleteHospitalByRegistrationID = async (req, res) => {
  try {
    // Find the hospital by registrationID and delete it
    const registrationID = decodeURIComponent(req.params.registrationID);
    const deletedHospital = await Hospital.findOneAndDelete({ registrationID });

    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    // Delete related hospital admin(s)
   const deletedAdmins = await HospitalAdmin.deleteMany({ hospitalName: deletedHospital.hospitalName });

    res.status(200).json({ message: "Hospital and related admins deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
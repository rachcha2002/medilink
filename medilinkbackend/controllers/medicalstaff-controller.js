const Doctor = require("../models/MedicalStaff/doctorModel");
const Nurse = require("../models/MedicalStaff/nurseModel");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");
const { firebaseConfig } = require("../config/firebase");

// Initialize a Firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// Setting up multer as a middleware to handle image uploads
const upload = multer({ storage: multer.memoryStorage() }).single("photo");

// Function to upload image to Firebase and get the download URL
const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null); // If no image provided, resolve with null
    }

    const storageRef = ref(
      storage,
      `images/${Date.now()}_${file.originalname}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file.buffer);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Can track upload progress here if needed
      },
      (error) => {
        reject(error); // Handle upload error
      },
      async () => {
        // Get download URL after upload completes
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Create Medical Staff (Doctor or Nurse)
const createMedicalStaff = async (req, res) => {
  try {
    // Handle image upload using multer
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Image upload failed", error: err });
      }

      const {
        name,
        nic,
        contact,
        email,
        password,
        speciality,
        position,
        workingHours,
        hospital,
      } = req.body;

      // Upload image to Firebase and get the URL
      const photoUrl = await uploadImageToFirebase(req.file);

      let staff;
      if (position === "Doctor") {
        // Create a new Doctor
        staff = new Doctor({
          name,
          nic,
          contactNo: contact,
          email,
          password, // You should hash the password before saving to DB
          speciality,
          workingHours: workingHours || [],
          hospital,
          photoUrl,
        });
      } else if (position === "Nurse") {
        // Create a new Nurse
        staff = new Nurse({
          name,
          nic,
          contactNo: contact,
          email,
          password, // You should hash the password before saving to DB
          hospital,
          photoUrl,
        });
      } else {
        return res.status(400).json({ message: "Invalid position" });
      }

      // Save the staff record to the database
      await staff.save();

      return res
        .status(201)
        .json({ message: `${position} created successfully`, staff });
    });
  } catch (error) {
    console.error("Error creating medical staff:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createMedicalStaff,
};

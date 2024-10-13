const Doctor = require("../models/MedicalStaff/doctorModel");
const Nurse = require("../models/MedicalStaff/nurseModel");
const app = require("../config/firebase");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject, // For deleting image from Firebase
} = require("firebase/storage");
const multer = require("multer");
const bcrypt = require("bcryptjs");

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

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
      `images/medicalstaff/${Date.now()}_${file.originalname}`
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

// Function to delete image from Firebase
const deleteImageFromFirebase = (imageUrl) => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      resolve(); // If there's no image, just resolve
    }

    // Create a reference to the image using its URL
    const imageRef = ref(storage, imageUrl);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully from Firebase");
        resolve();
      })
      .catch((error) => {
        console.error("Error deleting image from Firebase:", error);
        reject(error);
      });
  });
};

// Function to hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Function to generate a unique ID for Doctor or Nurse
const generateUniqueId = async (position) => {
  let count, id;
  if (position === "Doctor") {
    count = await Doctor.countDocuments(); // Get the count of doctor records
    id = `D${String(count + 1).padStart(7, "0")}`; // Generate ID in the format D0000000
  } else if (position === "Nurse") {
    count = await Nurse.countDocuments(); // Get the count of nurse records
    id = `N${String(count + 1).padStart(7, "0")}`; // Generate ID in the format N0000000
  }
  return id;
};

// Function to split working hours from a string to an array
const splitWorkingHours = (workingHoursString) => {
  return workingHoursString.split(",").map((hour) => hour.trim());
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

      // Check if NIC is unique before proceeding
      const existingNIC =
        (await Doctor.findOne({ nic })) || (await Nurse.findOne({ nic }));
      if (existingNIC) {
        return res.status(400).json({ message: "NIC already exists" });
      }

      // Check if Email is unique before proceeding
      const existingEmail =
        (await Doctor.findOne({ email })) || (await Nurse.findOne({ email }));
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Upload image to Firebase and get the URL
      const photoUrl = await uploadImageToFirebase(req.file);

      // Hash the password before saving it to the database
      const hashedPassword = await hashPassword(password);

      // Generate a unique doctorId or nurseId based on the position
      const uniqueId = await generateUniqueId(position);

      let staff;
      if (position === "Doctor") {
        // Create a new Doctor with unique doctorId and split working hours
        staff = new Doctor({
          doctorId: uniqueId, // Use the generated doctorId
          name,
          nic,
          contactNo: contact,
          email,
          password: hashedPassword, // Save hashed password
          speciality,
          workingHours: splitWorkingHours(workingHours), // Split string into an array
          hospital,
          photoUrl,
        });
      } else if (position === "Nurse") {
        // Create a new Nurse with unique nurseId
        staff = new Nurse({
          nurseId: uniqueId, // Use the generated nurseId
          name,
          nic,
          contactNo: contact,
          email,
          password: hashedPassword, // Save hashed password
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

// Get all Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ doctorId: id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Doctor by ID
const deleteDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOneAndDelete({ doctorId: id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete the doctor's image from Firebase if it exists
    if (doctor.photoUrl) {
      await deleteImageFromFirebase(doctor.photoUrl);
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all Nurses
const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find({});
    res.status(200).json(nurses);
  } catch (error) {
    console.error("Error fetching nurses:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Nurse by ID
const getNurseById = async (req, res) => {
  try {
    const { id } = req.params;
    const nurse = await Nurse.findOne({ nurseId: id });
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res.status(200).json(nurse);
  } catch (error) {
    console.error("Error fetching nurse:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Nurse by ID
const deleteNurseById = async (req, res) => {
  try {
    const { id } = req.params;
    const nurse = await Nurse.findOneAndDelete({ nurseId: id });

    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }

    // Delete the nurse's image from Firebase if it exists
    if (nurse.photoUrl) {
      await deleteImageFromFirebase(nurse.photoUrl);
    }

    res.status(200).json({ message: "Nurse deleted successfully" });
  } catch (error) {
    console.error("Error deleting nurse:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Doctor by ID
const updateDoctorById = async (req, res) => {
  console.log("Update Doctor by ID");
  try {
    const { id } = req.params;
    const {
      name,
      nic,
      contact,
      email,
      password,
      speciality,
      workingHours,
      hospital,
    } = req.body;

    console.log("Update Doctor by ID", req.body);

    // Find the doctor by doctorId
    let doctor = await Doctor.findOne({ doctorId: id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Handle image upload (optional)
    let photoUrl = doctor.photoUrl;
    if (req.file) {
      // If a new file is uploaded, delete the old one and upload the new one
      if (doctor.photoUrl) {
        await deleteImageFromFirebase(doctor.photoUrl);
      }
      photoUrl = await uploadImageToFirebase(req.file);
    }

    // Hash the password if it is provided and different
    let hashedPassword = doctor.password;
    if (password && password !== doctor.password) {
      hashedPassword = await hashPassword(password);
    }

    // Update the doctor fields
    doctor.name = name || doctor.name;
    doctor.nic = nic || doctor.nic;
    doctor.contactNo = contact || doctor.contactNo;
    doctor.email = email || doctor.email;
    doctor.password = hashedPassword;
    doctor.speciality = speciality || doctor.speciality;

    // Check if workingHours is a string and split, else use the array as is
    doctor.workingHours =
      typeof workingHours === "string"
        ? splitWorkingHours(workingHours)
        : workingHours || doctor.workingHours;

    doctor.hospital = hospital || doctor.hospital;
    doctor.photoUrl = photoUrl;

    console.log("Doctor:", doctor);

    // Save the updated doctor record
    await doctor.save();

    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Nurse by ID
const updateNurseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nic, contact, email, password, hospital } = req.body;

    // Find the nurse by nurseId
    let nurse = await Nurse.findOne({ nurseId: id });
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }

    // Handle image upload (optional)
    let photoUrl = nurse.photoUrl;
    if (req.file) {
      // If a new file is uploaded, delete the old one and upload the new one
      if (nurse.photoUrl) {
        await deleteImageFromFirebase(nurse.photoUrl);
      }
      photoUrl = await uploadImageToFirebase(req.file);
    }

    // Hash the password if it is provided and different
    let hashedPassword = nurse.password;
    if (password && password !== nurse.password) {
      hashedPassword = await hashPassword(password);
    }

    // Update the nurse fields
    nurse.name = name || nurse.name;
    nurse.nic = nic || nurse.nic;
    nurse.contactNo = contact || nurse.contactNo;
    nurse.email = email || nurse.email;
    nurse.password = hashedPassword;
    nurse.hospital = hospital || nurse.hospital;
    nurse.photoUrl = photoUrl;

    // Save the updated nurse record
    await nurse.save();

    res.status(200).json({ message: "Nurse updated successfully", nurse });
  } catch (error) {
    console.error("Error updating nurse:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Doctors by Hospital
const getDoctorsByHospital = async (req, res) => {
  try {
    const { hospital } = req.params; // Extract hospital name from params
    const doctors = await Doctor.find({ hospital }); // Find doctors with the matching hospital
    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No doctors found for this hospital" });
    }
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors by hospital:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Nurses by Hospital
const getNursesByHospital = async (req, res) => {
  try {
    const { hospital } = req.params; // Extract hospital name from params
    const nurses = await Nurse.find({ hospital }); // Find nurses with the matching hospital
    if (nurses.length === 0) {
      return res
        .status(404)
        .json({ message: "No nurses found for this hospital" });
    }
    res.status(200).json(nurses);
  } catch (error) {
    console.error("Error fetching nurses by hospital:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  createMedicalStaff,
  getAllDoctors,
  getDoctorById,
  deleteDoctorById, // Add delete doctor function to module exports
  getAllNurses,
  getNurseById,
  deleteNurseById, // Add delete nurse function to module exports
  updateDoctorById,
  updateNurseById,
  getDoctorsByHospital,
  getNursesByHospital,
};

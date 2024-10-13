const MLTStaff = require("../models/MedicalStaff/mltModel");
const app = require("../config/firebase");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const bcrypt = require("bcryptjs");
const multer = require("multer");

// Initialize Cloud Storage
const storage = getStorage(app);

const upload = multer({ storage: multer.memoryStorage() }).single("photo"); // Handles single photo upload

// Function to upload image to Firebase and get the download URL
const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null); // If no image provided, resolve with null
    }

    const storageRef = ref(
      storage,
      `images/mltstaff/${Date.now()}_${file.originalname}`
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

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Generate unique mltId based on subject (Radiology or Laboratory)
const generateMLTId = async (subject) => {
  let prefix = "";
  let count = 0;

  if (subject === "Radiology") {
    prefix = "R";
    count = await MLTStaff.countDocuments({ subject: "Radiology" });
  } else if (subject === "Laboratory") {
    prefix = "L";
    count = await MLTStaff.countDocuments({ subject: "Laboratory" });
  }

  // Generate ID in the format R000000 or L000000
  return `${prefix}${String(count + 1).padStart(6, "0")}`;
};

// Create MLT Staff
const createMLTStaff = async (req, res) => {
  try {
    // Handle image upload using multer
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Image upload failed", error: err });
      }

      // Extract form fields from req.body
      const {
        name,
        nic,
        contactNo,
        subject,
        speciality,
        email,
        password,
        hospital,
      } = req.body;

      // Check for required fields
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Check for unique NIC and Email
      const existingNIC = await MLTStaff.findOne({ nic });
      const existingEmail = await MLTStaff.findOne({ email });
      if (existingNIC || existingEmail) {
        return res.status(400).json({ message: "NIC or Email already exists" });
      }

      // Generate unique mltId based on subject
      const mltId = await generateMLTId(subject);

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Upload image to Firebase and get the URL
      const photoUrl = await uploadImageToFirebase(req.file);
      /*if (!photoUrl) {
        return res.status(401).json({ message: "Image uploaded successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Image uploaded unsuccessfully" });
      }*/

      // Create new MLT staff object
      const mltStaff = new MLTStaff({
        mltId, // Use the generated mltId
        name,
        nic,
        contactNo,
        subject,
        speciality,
        email,
        password: hashedPassword,
        hospital,
        photoUrl, // Include photo URL if exists
      });

      // Save to the database
      await mltStaff.save();

      // Respond with success message
      res
        .status(201)
        .json({ message: "MLT Staff created successfully", mltStaff });
    });
  } catch (error) {
    console.error("Error creating MLT staff:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all MLT Staff
const getAllMLTStaff = async (req, res) => {
  try {
    const mltStaff = await MLTStaff.find({});
    res.status(200).json(mltStaff);
  } catch (error) {
    console.error("Error fetching MLT staff:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get MLT Staff by ID
const getMLTStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const mltStaff = await MLTStaff.findOne({ mltId: id });
    if (!mltStaff) {
      return res.status(404).json({ message: "MLT Staff not found" });
    }
    return res.status(200).json(mltStaff);
  } catch (error) {
    console.error("Error fetching MLT staff:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Update MLT Staff by ID
const updateMLTStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      nic,
      contactNo,
      address,
      subject,
      speciality,
      email,
      password,
      hospital,
    } = req.body;

    // Find the MLT staff by ID
    let mltStaff = await MLTStaff.findOne({ mltId: id });
    if (!mltStaff) {
      return res.status(404).json({ message: "MLT Staff not found" });
    }

    // Handle image upload (optional)
    let photoUrl = mltStaff.photoUrl;
    if (req.file) {
      if (mltStaff.photoUrl) {
        // Delete previous image from Firebase if it exists
        await deleteImageFromFirebase(mltStaff.photoUrl);
      }
      photoUrl = await uploadImageToFirebase(req.file); // Upload new photo to Firebase
    }

    // Hash the password if provided and it's different from the current one
    let hashedPassword = mltStaff.password;
    if (password && password !== mltStaff.password) {
      hashedPassword = await hashPassword(password);
    }

    // Update the fields
    mltStaff.name = name || mltStaff.name;
    mltStaff.nic = nic || mltStaff.nic;
    mltStaff.contactNo = contactNo || mltStaff.contactNo;
    mltStaff.address = address || mltStaff.address;
    mltStaff.subject = subject || mltStaff.subject;
    mltStaff.speciality = speciality || mltStaff.speciality;
    mltStaff.email = email || mltStaff.email;
    mltStaff.password = hashedPassword; // Save the new hashed password if updated
    mltStaff.hospital = hospital || mltStaff.hospital;
    mltStaff.photoUrl = photoUrl; // Save new photo URL if updated

    // Save the updated staff record
    await mltStaff.save();

    return res
      .status(200)
      .json({ message: "MLT Staff updated successfully", mltStaff });
  } catch (error) {
    console.error("Error updating MLT staff:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete MLT Staff by ID
const deleteMLTStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the MLT staff by ID and delete
    const mltStaff = await MLTStaff.findOneAndDelete({ mltId: id });
    if (!mltStaff) {
      return res.status(404).json({ message: "MLT Staff not found" });
    }

    // Delete the image from Firebase if it exists
    if (mltStaff.photoUrl) {
      await deleteImageFromFirebase(mltStaff.photoUrl);
    }

    return res.status(200).json({ message: "MLT Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting MLT staff:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get MLT Staff by Hospital
const getMLTStaffByHospital = async (req, res) => {
  try {
    const { hospital } = req.params; // Get the hospital from request params
    const mltStaff = await MLTStaff.find({ hospital }); // Query MLT staff by hospital

    if (!mltStaff || mltStaff.length === 0) {
      return res
        .status(404)
        .json({ message: "No MLT Staff found for this hospital" });
    }

    return res.status(200).json(mltStaff); // Return the staff found
  } catch (error) {
    console.error("Error fetching MLT staff by hospital:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createMLTStaff,
  getAllMLTStaff,
  getMLTStaffById,
  updateMLTStaffById,
  deleteMLTStaffById,
  getMLTStaffByHospital,
};

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const app = require("../config/firebase"); // Import initialized Firebase app

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to upload a file to Firebase Storage (with dynamic folder support)
const uploadFileToFirebase = async (file, folder = "reports") => {
  try {
    // Include the folder name dynamically in the file path
    const fileName = `${folder}/${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, fileName);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error); // Handle upload error
        },
        async () => {
          resolve(); // Handle successful upload completion
        }
      );
    });

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);
    return { publicUrl: downloadURL, fileName }; // Return both URL and the full file path
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// Function to delete a file from Firebase Storage
const deleteFileFromFirebase = async (fileName) => {
  try {
    // Ensure the full path including the folder is used to reference the file
    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

module.exports = { uploadFileToFirebase, deleteFileFromFirebase };

const MedicalRecord = require("../../models/MedicalInfo/medicalRecordsModel");
const { uploadFileToFirebase } = require("../../config/firebaseStorage");

// Utility to generate unique mrId (format: MR00000000)
const generateUniqueMrId = async () => {
  const lastRecord = await MedicalRecord.findOne().sort({ mrId: -1 });
  let newIdNumber = 1;
  if (lastRecord) {
    const lastIdNumber = parseInt(lastRecord.mrId.replace("MR", ""), 10);
    newIdNumber = lastIdNumber + 1;
  }
  return `MR${newIdNumber.toString().padStart(8, "0")}`;
};

// Create new medical record with file upload
exports.createMedicalRecord = async (req, res) => {
  try {
    const mrId = await generateUniqueMrId(); // Generate unique mrId

    let medicalDocument = null;
    if (req.file) {
      const uploadedFile = await uploadFileToFirebase(
        req.file,
        "medicalrecords"
      ); // Save in "medicalrecords" folder
      medicalDocument = {
        fileName: uploadedFile.fileName,
        fileUrl: uploadedFile.publicUrl, // Ensure this matches what Firebase returns
        uploadedDate: new Date(),
      };
    }

    const medicalRecord = new MedicalRecord({
      ...req.body,
      mrId,
      medicalDocument, // Will be null if no file uploaded
    });

    await medicalRecord.save();
    res.status(201).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: "Error creating medical record", error });
  }
};

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
};

// Get medical record by ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record", error });
  }
};

// Get medical records by hospital
exports.getMedicalRecordsByHospital = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ hospital: req.params.hospital });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
};

// Get medical records by patientId
exports.getMedicalRecordsByPatientId = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patientId: req.params.patientId,
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
};

// Get medical records by createdBy
exports.getMedicalRecordsByCreatedBy = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      createdBy: req.params.createdBy,
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
};

// Update medical record by ID
exports.updateMedicalRecordById = async (req, res) => {
  console.log(req.body);
  try {
    let medicalDocument = null;

    if (req.file) {
      const uploadedFile = await uploadFileToFirebase(
        req.file,
        "medicalrecords"
      ); // Update file in the correct folder
      medicalDocument = {
        fileName: uploadedFile.fileName,
        fileUrl: uploadedFile.publicUrl, // Ensure correct URL is returned from Firebase
        uploadedDate: new Date(),
      };
    }

    const updateData = { ...req.body };
    if (medicalDocument) {
      updateData.medicalDocument = medicalDocument; // Only update document if new file is uploaded
    }

    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error updating record", error });
  }
};

// Delete medical record by ID
exports.deleteMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
};

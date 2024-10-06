const {
  LabReport,
  RadiologyReport,
} = require("../../models/MedicalInfo/Reports");
const ReportFactory = require("../../factory/reportFactory");
const {
  uploadFileToFirebase,
  deleteFileFromFirebase,
} = require("../../config/firebaseStorage");

// Create a new report with file upload, ensuring no duplicate `testName` and `date`
exports.createReportWithFile = async (req, res) => {
  const { reportType, ...reportData } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Retrieve the correct model based on report type
    const ReportModel = ReportFactory.getModel(reportType);

    // Check for duplicate report (same testName and date)
    const existingReport = await ReportModel.findOne({
      testName: reportData.testName,
      date: reportData.date,
      reportType: reportType, // Include reportType in the check if needed
    });

    if (existingReport) {
      return res.status(400).json({
        message: "Report with the same testName, date, and type already exists",
      });
    }

    // Upload the file to Firebase and get the public URL and fileName
    const { publicUrl, fileName } = await uploadFileToFirebase(req.file);

    // Save the report data with the file URL and fileName
    const report = new ReportModel({
      ...reportData,
      reportType, // Save reportType in the database
      resultPdf: publicUrl,
      firebaseFileName: fileName,
    });

    await report.save();

    res
      .status(201)
      .json({ message: `${reportType} report created successfully`, report });
  } catch (error) {
    res.status(500).json({
      message: "Error uploading file or saving report",
      error: error.message,
    });
  }
};

// Get all reports (Lab and Radiology)
exports.getAllReports = async (req, res) => {
  try {
    const labReports = await LabReport.find();
    const radiologyReports = await RadiologyReport.find();
    res.status(200).json({ labReports, radiologyReports });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

// Get reports by hospital
exports.getReportsByHospital = async (req, res) => {
  const { hospital } = req.params;
  try {
    const labReports = await LabReport.find({ hospital });
    const radiologyReports = await RadiologyReport.find({ hospital });
    res.status(200).json({ labReports, radiologyReports });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.message });
  }
};

// Get report by ID
exports.getReportById = async (req, res) => {
  const { reportType, id } = req.params;
  try {
    const ReportModel = ReportFactory.getModel(reportType);
    const report = await ReportModel.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching report", error: error.message });
  }
};

// Get reports by laboratoristId
exports.getReportsByLaboratoristId = async (req, res) => {
  const { laboratoristId } = req.params;
  try {
    const labReports = await LabReport.find({ laboratoristId });
    res.status(200).json(labReports);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lab reports", error: error.message });
  }
};

// Get reports by radiologistId
exports.getReportsByRadiologistId = async (req, res) => {
  const { radiologistId } = req.params;
  try {
    const radiologyReports = await RadiologyReport.find({ radiologistId });
    res.status(200).json(radiologyReports);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching radiology reports",
      error: error.message,
    });
  }
};

// Get reports by patientId
exports.getReportsByPatientId = async (req, res) => {
  console.log("getReportsByPatientId");
  const { patientId } = req.params;
  try {
    const labReports = await LabReport.find({ patientId });
    const radiologyReports = await RadiologyReport.find({ patientId });
    res.status(200).json({ labReports, radiologyReports });
  } catch (error) {
    console.error("Detailed error:", error);
    res
      .status(500)
      .json({ message: "Error fetching reports", error: error.toString() });
  }
};

// Delete report by ID (also deletes the file from Firebase)
exports.deleteReportById = async (req, res) => {
  const { reportType, id } = req.params;
  try {
    const ReportModel = ReportFactory.getModel(reportType);
    const report = await ReportModel.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Delete the file from Firebase Storage
    if (report.firebaseFileName) {
      await deleteFileFromFirebase(report.firebaseFileName);
    }

    // Delete the report from MongoDB
    await ReportModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting report", error: error.message });
  }
};

// Update report by ID (with optional file replacement)
exports.updateReportById = async (req, res) => {
  const { reportType, id } = req.params;
  const updateData = { ...req.body };

  try {
    // Fetch the correct model based on the existing reportType in the request
    const ReportModel = ReportFactory.getModel(reportType);

    let report = await ReportModel.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Optionally prevent updating reportType by removing it from updateData
    // delete updateData.reportType; // Uncomment this line if you want to prevent changing the reportType

    // Check for duplicate reports excluding the current one
    const existingReport = await ReportModel.findOne({
      _id: { $ne: id },
      testName: updateData.testName,
      date: updateData.date,
      reportType: updateData.reportType || reportType, // Check using new or old reportType
    });

    if (existingReport) {
      return res.status(400).json({
        message:
          "Another report with the same testName, date, and type already exists",
      });
    }

    // Handle file replacement if a new file is provided
    if (req.file) {
      // Delete the old file from Firebase Storage if it exists
      if (report.firebaseFileName) {
        await deleteFileFromFirebase(report.firebaseFileName);
      }

      // Upload the new file to Firebase Storage
      const { publicUrl, fileName } = await uploadFileToFirebase(req.file);

      // Update the file URL and fileName in the update data
      updateData.resultPdf = publicUrl;
      updateData.firebaseFileName = fileName;
    }

    // Update the report with new data
    report = await ReportModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Report updated successfully", report });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating report", error: error.message });
  }
};

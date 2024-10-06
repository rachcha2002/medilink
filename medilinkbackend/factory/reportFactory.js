const { LabReport, RadiologyReport } = require("../models/MedicalInfo/Reports");

class ReportFactory {
  static createReport(type, data) {
    switch (type.toLowerCase()) {
      case "laboratory":
        return new LabReport(data);
      case "radiology":
        return new RadiologyReport(data);
      default:
        throw new Error("Invalid report type");
    }
  }

  // Method to get the appropriate model based on report type
  static getModel(type) {
    switch (type.toLowerCase()) {
      case "laboratory":
        return LabReport;
      case "radiology":
        return RadiologyReport;
      default:
        throw new Error("Invalid report type");
    }
  }
}

module.exports = ReportFactory;

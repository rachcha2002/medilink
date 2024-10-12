import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import ReportList from "./ReportList";

function AllMedicalReportList({ reportType, toggleLoading }) {
  const hospitalName = "Medi Help";
  // Determine API URL based on report type
  let apiUrl; // Default API URL for all reports

  // Set dynamic page title based on report type
  let pageTitle;
  let fronturl;

  if (reportType === "Radiology") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/radiology/${hospitalName}`;
    pageTitle = "Radiology Reports";
    fronturl = "/mltstaff/radiologyreportlist";
  } else if (reportType === "Laboratory") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/laboratory/${hospitalName}`;
    pageTitle = "Laboratory Reports";
    fronturl = "/mltstaff/labreportlist";
  } else {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/hospital/${hospitalName}`;
    pageTitle = "All Reports";
    fronturl = "/mltstaff/reportlist";
  }

  return (
    <main id="main" className="main">
      <PageTitle title={pageTitle} url={fronturl} />
      <ReportList
        apiUrl={apiUrl}
        title={pageTitle}
        toggleLoading={toggleLoading}
      />
    </main>
  );
}

export default AllMedicalReportList;

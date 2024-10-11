import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "./Main.css";
import ReportList from "./ReportList";

function AllMedicalReportList({ reportType, toggleLoading }) {
  const hospitalName = "Medi Help";
  // Determine API URL based on report type
  let apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/hospital/${hospitalName}`; // Default API URL for all reports

  // Set dynamic page title based on report type
  let pageTitle = "All Reports";

  if (reportType === "Radiology") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/radiology/${hospitalName}`;
    pageTitle = "Radiology Reports";
  } else if (reportType === "Laboratory") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/laboratory/${hospitalName}`;
    pageTitle = "Laboratory Reports";
  }

  return (
    <main id="main" className="main">
      <PageTitle title={pageTitle} url="/mltstaff/reportlist" />
      <ReportList
        apiUrl={apiUrl}
        title={pageTitle}
        toggleLoading={toggleLoading}
      />
    </main>
  );
}

export default AllMedicalReportList;

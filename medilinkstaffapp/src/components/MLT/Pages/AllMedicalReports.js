import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import ReportList from "./ReportList";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have AuthContext

function AllMedicalReportList({ reportType, toggleLoading }) {
  const { user } = useAuthContext(); // Get user from context
  const [hospitalName, setHospitalName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state for user data and apiUrl

  // Wait until user is fully loaded and assign hospitalName and apiUrl
  useEffect(() => {
    if (user && user.hospital) {
      const hospital = user.hospital;
      setHospitalName(hospital); // Assign hospitalName from user context

      // Determine API URL based on report type
      let url;
      if (reportType === "Radiology") {
        url = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/radiology/${hospital}`;
      } else if (reportType === "Laboratory") {
        url = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/laboratory/${hospital}`;
      } else {
        url = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/hospital/${hospital}`;
      }

      setApiUrl(url); // Assign apiUrl
      setIsLoading(false); // Mark as done loading
    }
  }, [user, reportType]);

  // Set dynamic page title based on report type
  let pageTitle;
  let fronturl;
  if (reportType === "Radiology") {
    pageTitle = "Radiology Reports";
    fronturl = "/mltstaff/radiologyreportlist";
  } else if (reportType === "Laboratory") {
    pageTitle = "Laboratory Reports";
    fronturl = "/mltstaff/labreportlist";
  } else {
    pageTitle = "All Reports";
    fronturl = "/mltstaff/reportlist";
  }

  // Wait until user data and apiUrl are fully loaded
  if (isLoading) {
    return (
      <main id="main" className="main">
        <h4>Loading...</h4>
      </main>
    );
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

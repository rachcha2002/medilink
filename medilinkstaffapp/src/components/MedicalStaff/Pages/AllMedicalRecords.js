import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import MedicalRecords from "./MedicalRecords";

function AllMedicalRecords({ type, toggleLoading }) {
  const hospitalName = "Medi Help";
  // Determine API URL based on report type
  let apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/hospital/${hospitalName}`; // Default API URL for all reports

  // Set dynamic page title based on report type
  let pageTitle = "All Medical Reports";

  /*if (type === "byid") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/created-by/:createdBy`;
    pageTitle = "My Medical Records";
  } */

  return (
    <main id="main" className="main">
      <PageTitle title={pageTitle} url="/mltstaff/reportlist" />
      <MedicalRecords
        apiUrl={apiUrl}
        title={pageTitle}
        toggleLoading={toggleLoading}
      />
    </main>
  );
}

export default AllMedicalRecords;

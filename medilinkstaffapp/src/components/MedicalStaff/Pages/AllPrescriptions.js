import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../Common/PageTitle";
import "./Main.css";
import Prescriptions from "./Prescriptions";

function AllPrescriptions({ type, toggleLoading }) {
  const hospitalName = "Medi Help";
  // Determine API URL based on report type
  let apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/prescriptions/hospital/${hospitalName}`; // Default API URL for all reports

  // Set dynamic page title based on report type
  let pageTitle = "All Prescriptions";

  /*if (type === "byid") {
    apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/prescriptions/doctor/:doctorId`;
    pageTitle = "My Prescriptions";
  } */

  return (
    <main id="main" className="main">
      <PageTitle title={pageTitle} url="/mltstaff/reportlist" />
      <Prescriptions
        apiUrl={apiUrl}
        title={pageTitle}
        toggleLoading={toggleLoading}
      />
    </main>
  );
}

export default AllPrescriptions;

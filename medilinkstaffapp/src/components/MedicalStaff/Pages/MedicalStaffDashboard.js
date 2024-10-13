import React from "react";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import PatientDetailsForm from "./PatientDetailsForm";

function MedicalStaffDashboard() {
  return (
    <main id="main" className="main">
      <PageTitle title="Medical Dashboard" url="/medicalstaff" />
      <hr />
      <PatientDetailsForm />
    </main>
  );
}

export default MedicalStaffDashboard;

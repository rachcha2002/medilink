import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm";
import PatientDetails from "./PatientDetails";
import UpdatePatientProfileForm from "./UpdatePatientProfileForm";

export default function PatientMain() {
  return (
    <Routes>
      <Route path="/patientform" element={<PatientProfileForm />} />

      <Route path="/patientdetails" element={<PatientDetails />} />

      <Route path="/update/:id" element={<UpdatePatientProfileForm />} />
    </Routes>
  );
}

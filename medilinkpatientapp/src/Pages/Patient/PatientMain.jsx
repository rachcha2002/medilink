import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PatientProfileForm from "./PatientProfileForm";

export default function PatientMain() {
  return (
    <Routes>
      <Route path="/patientform" element={<PatientProfileForm />} />
    </Routes>
  );
}

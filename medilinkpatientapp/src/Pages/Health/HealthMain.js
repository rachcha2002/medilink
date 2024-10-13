import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HealthSummary from "./HealthSummary";
import PrescriptionList from "./PrescriptionList";
import MedicalRecordsList from "./MedicalRecordsList";
import MedicalReports from "./MedicalReorts";

export default function HealthMain() {
  return (
    <Routes>
      <Route path="/healthsummery" element={<HealthSummary />} />

      <Route path="/prescriptions" element={<PrescriptionList />} />

      <Route path="/medicalrecords" element={<MedicalRecordsList />} />

      <Route path="/medicalreports" element={<MedicalReports />} />
    </Routes>
  );
}

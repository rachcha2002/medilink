import React from "react";
import Header from "../Header/Header";
import SideBar from "./Sidebar/SideBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrescriptionForm from "./Pages/PrescriptionForm";
import PrescriptionsByHospital from "./Pages/PrescriptionsByHospital";
import PrescriptionUpdateForm from "./Pages/PrescriptionUpdateForm";
import CreateMedicalRecordForm from "./Pages/CreateMedicalRecordForm";
import MedicalRecords from "./Pages/MedicalRecords";
import UpdateMedicalRecordForm from "./Pages/UpdateMedicalRecordForm";
import MedicalStaffDashboard from "./Pages/MedicalStaffDashboard";

const MedicalStaff = ({ toggleLoading }) => {
  return (
    <>
      <Header />;
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<MedicalStaffDashboard toggleLoading={toggleLoading} />}
        />
        <Route
          path="/addprescription"
          element={<PrescriptionForm toggleLoading={toggleLoading} />}
        />
        <Route
          path="/prescriptionbyhospital"
          element={<PrescriptionsByHospital toggleLoading={toggleLoading} />}
        />
        <Route
          path="/updateprescription/:id"
          element={<PrescriptionUpdateForm toggleLoading={toggleLoading} />}
        />

        <Route
          path="/addmedicalrecord"
          element={<CreateMedicalRecordForm toggleLoading={toggleLoading} />}
        />

        <Route
          path="/medicalrecords"
          element={<MedicalRecords toggleLoading={toggleLoading} />}
        />

        <Route
          path="/updatemedicalrecords/:id"
          element={<UpdateMedicalRecordForm toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
};

export default MedicalStaff;

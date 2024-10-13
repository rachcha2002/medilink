import React from "react";
import Header from "../Header/Header";
import SideBar from "./Sidebar/SideBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrescriptionForm from "./Pages/PrescriptionForm";
import PrescriptionUpdateForm from "./Pages/PrescriptionUpdateForm";
import CreateMedicalRecordForm from "./Pages/CreateMedicalRecordForm";
import MedicalRecords from "./Pages/MedicalRecords";
import UpdateMedicalRecordForm from "./Pages/UpdateMedicalRecordForm";
import MedicalStaffDashboard from "./Pages/MedicalStaffDashboard";
import AllMedicalRecords from "./Pages/AllMedicalRecords";
import AllPrescriptions from "./Pages/AllPrescriptions";

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
          path="/prescriptions"
          element={<AllPrescriptions toggleLoading={toggleLoading} />}
        />

        <Route
          path="/prescriptionbystaff"
          element={
            <AllPrescriptions type="byid" toggleLoading={toggleLoading} />
          }
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
          element={<AllMedicalRecords toggleLoading={toggleLoading} />}
        />

        <Route
          path="/medicalrecordsbystaff"
          element={
            <AllMedicalRecords type="byid" toggleLoading={toggleLoading} />
          }
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

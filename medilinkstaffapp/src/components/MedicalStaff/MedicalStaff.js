import React from "react";
import Header from "../Header/Header";
import SideBar from "./Sidebar/SideBar";
//import Main from "../Main/Main";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddMedicalStaff from "./Pages/AddMedicalStaff";
import DoctorsList from "./Pages/DoctorsList";
import NursesList from "./Pages/NursesList";
import UpdateMedicalStaff from "./Pages/UpdateMedicalStaff";
import PrescriptionForm from "./Pages/PrescriptionForm";
import PrescriptionsByHospital from "./Pages/PrescriptionsByHospital";

const MedicalStaff = ({ toggleLoading }) => {
  return (
    <>
      <Header />;
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<AddMedicalStaff toggleLoading={toggleLoading} />}
        />
        <Route
          path="/doctors"
          element={<DoctorsList toggleLoading={toggleLoading} />}
        />
        <Route
          path="/nurses"
          element={<NursesList toggleLoading={toggleLoading} />}
        />
        <Route
          path="/update/:position/:id"
          element={<UpdateMedicalStaff toggleLoading={toggleLoading} />}
        />
        <Route
          path="/addprescription"
          element={<PrescriptionForm toggleLoading={toggleLoading} />}
        />
        <Route
          path="/prescriptionbyhospital"
          element={<PrescriptionsByHospital toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
};

export default MedicalStaff;

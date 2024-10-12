import React from "react";
import Header from "../Header/Header";
import SideBar from "./HospitalAdminSidebar/SideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Payments from "./Payments/Payments";
import HealthAdminDashboard from "./HealthAdminDashboard";
import BillingForm from "./Payments/Pages/BillingForm";
import Channelinglist from "./Appointments/Pages/Channelinglist";
import Cliniclist from "./Appointments/Pages/Cliniclist";
import TestsandScans from "./Appointments/Pages/TestsandScans";
import MedicalStaffPage from "../MedicalStaff/Pages/MedicalStaffPage";
import MLTStaffList from "../MLT/Pages/MLTStaffList";
import AddMedicalStaff from "../MedicalStaff/Pages/AddMedicalStaff";
import AddMLTStaff from "../MLT/Pages/AddMLTStaff";
import UpdateMLTStaff from "../MLT/Pages/UpdateMLTStaff";
import UpdateMedicalStaff from "../MedicalStaff/Pages/UpdateMedicalStaff";

const HospitalAdmin = ({ toggleLoading }) => {
  return (
    <div>
      <>
        <Header />
        <SideBar />

        <Routes>
          <Route path="/" element={<HealthAdminDashboard />} />

          {/* Payment Routes */}
          <Route path="payment" element={<Payments />} />
          <Route path="payment/createBill" element={<BillingForm />} />
          <Route path="Channelingappointments" element={<Channelinglist />} />
          <Route path="Clinicappointments" element={<Cliniclist />} />
          <Route path="TestsandScansappointments" element={<TestsandScans />} />

          {/* Staff Routes */}
          <Route
            path="medicalstaff"
            element={<MedicalStaffPage toggleLoading={toggleLoading} />}
          />
          <Route
            path="mltstaff"
            element={<MLTStaffList toggleLoading={toggleLoading} />}
          />
          <Route
            path="addmedicalstaff"
            element={<AddMedicalStaff toggleLoading={toggleLoading} />}
          />

          <Route
            path="updatemedicalstaff/:position/:id"
            element={<UpdateMedicalStaff toggleLoading={toggleLoading} />}
          />

          <Route
            path="addmltstaff"
            element={<AddMLTStaff toggleLoading={toggleLoading} />}
          />

          <Route
            path="updatemltstaff/:id"
            element={<UpdateMLTStaff toggleLoading={toggleLoading} />}
          />
        </Routes>
      </>
    </div>
  );
};

export default HospitalAdmin;

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

const HospitalAdmin = () => {
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
          <Route path="Channelingappointments" element={<Channelinglist/>} />
          <Route path="Clinicappointments" element={<Cliniclist/>} />
          <Route path="TestsandScansappointments" element={<TestsandScans/>} />
          
          
        </Routes>
      </>
    </div>
  );
};

export default HospitalAdmin;

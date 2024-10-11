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
import AddMLTStaff from "./Pages/AddMLTStaff";
import MLTStaffList from "./Pages/MLTStaffList";
import UpdateMLTStaff from "./Pages/UpdateMLTStaff";
import CreateReportForm from "./Pages/CreateReportForm";
import ReportList from "./Pages/ReportList";
import UpdateReportForm from "./Pages/UpdateReportForm";
import MLTStaffDashboard from "./Pages/MLTStaffDashboard";
import AllMedicalReportList from "./Pages/AllMedicalReports";

const MLTStaff = ({ toggleLoading }) => {
  return (
    <>
      <Header />;
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<MLTStaffDashboard toggleLoading={toggleLoading} />}
        />
        <Route
          path="/createreport"
          element={<CreateReportForm toggleLoading={toggleLoading} />}
        />
        <Route
          path="/reportlist"
          element={<AllMedicalReportList toggleLoading={toggleLoading} />}
        />
        <Route
          path="/radiologyreportlist"
          element={
            <AllMedicalReportList
              reportType="Radiology"
              toggleLoading={toggleLoading}
            />
          }
        />
        <Route
          path="/labreportlist"
          reportType="Laboratory"
          element={
            <AllMedicalReportList reportType="" toggleLoading={toggleLoading} />
          }
        />
        <Route
          path="/reportupdate/:reportType/:reportId"
          element={<UpdateReportForm toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
};

export default MLTStaff;

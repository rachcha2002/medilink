import {React, useState} from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SystemAdmin/Sidebar/SideBar";
import PageTitle from "../Common/PageTitle";
import HospitalRegistration from "./Pages/HospitalRegistration";
import HospitalDetails from "./Pages/HospitalDetails";
import HospitalAdminDetails from "./Pages/HospitalAdminDetails";

const SystemAdmin = ({ toggleLoading }) => {
 
  return (
    <>
      <PageTitle title="System Admin Dashboard" url="/systemadmin" />
      <Header />
      <SideBar/>
      <Routes>
        <Route
        path="/registerhospital/*"
        element={<HospitalRegistration toggleLoading={toggleLoading} />}
        />
         <Route
        path="/hospitaldetails/*"
        element={<HospitalDetails toggleLoading={toggleLoading} />}
        />
        <Route
        path="/admindetails/*"
        element={<HospitalAdminDetails toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
};

export default SystemAdmin;

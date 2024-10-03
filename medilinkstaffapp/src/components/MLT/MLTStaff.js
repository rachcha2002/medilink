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

const MLTStaff = ({ toggleLoading }) => {
  return (
    <>
      <Header />;
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={<AddMLTStaff toggleLoading={toggleLoading} />}
        />
      </Routes>
    </>
  );
};

export default MLTStaff;

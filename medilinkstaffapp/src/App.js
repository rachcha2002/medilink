// Import icons and Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//Import CSS
import "./App.css";
// Import React and React Router
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loader from "./components/util/Loader";
//Import components
import LandingPage from "./components/LandingPage";

import MedicalStaff from "./components/MedicalStaff/MedicalStaff";
import MLTStaff from "./components/MLT/MLTStaff";

import HospitalAdmin from "./components/HospitalAdmin/HospitalAdmin";

// Main App component
function App() {
  const [loading, setLoading] = useState(false); // State to track loading status

  // Function to toggle loading state
  const toggleLoading = (status) => {
    setLoading(status);
  };

  return (
    <>
      {loading && <Loader />} {/* Display loader when loading state is true */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage toggleLoading={toggleLoading} />}
          />

          <Route
            path="/medicalstaff/*"
            element={<MedicalStaff toggleLoading={toggleLoading} />}
          />
          <Route
            path="/mltstaff/*"
            element={<MLTStaff toggleLoading={toggleLoading} />}
          />
          <Route
            path="/hospitaladmin/*"
            element={<HospitalAdmin toggleLoading={toggleLoading} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

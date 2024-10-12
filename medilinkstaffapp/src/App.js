import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//Import CSS
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/util/Loader";
import { useNavigate } from "react-router-dom";
// Import your components
import LandingPage from "./components/LandingPage";
import MedicalStaff from "./components/MedicalStaff/MedicalStaff";
import MLTStaff from "./components/MLT/MLTStaff";
import HospitalAdmin from "./components/HospitalAdmin/HospitalAdmin";
import SystemAdmin from "./components/SystemAdmin/SystemAdmin";
import LoginForm from "./components/Common/Login";
import { AuthContext, useAuthContext } from "./context/AuthContext"; // Import AuthContext

let logoutTimer;

function App() {
  const [loading, setLoading] = useState(false); // State to track loading status

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usertype, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const navigate = useNavigate();

  const toggleLoading = (status) => {
    setLoading(status);
  };

  // Login function
  const login = useCallback((usertype, user, token, expirationDate) => {
    console.log("Start of login function");
    console.log(usertype, user, token);
    setIsLoggedIn(true);
    setUserType(usertype);
    setUser(user);
    setToken(token);

    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1-hour expiration
    setTokenExpirationDate(tokenExpiration);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        usertype,
        user,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserType(null);
    setUser(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    navigate("/login");
  }, []);

  // Handle automatic logout when token expires
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Check local storage for existing authentication data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.usertype,
        storedData.user,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <>
      {loading && <Loader />} {/* Display loader when loading state is true */}
      <AuthContext.Provider
        value={{
          isLoggedIn,
          usertype,
          user,
          token,
          login,
          logout,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<LandingPage toggleLoading={toggleLoading} />}
          />
          <Route
            path="/login"
            element={<LoginForm toggleLoading={toggleLoading} />}
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
          <Route
            path="/systemadmin/*"
            element={<SystemAdmin toggleLoading={toggleLoading} />}
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;

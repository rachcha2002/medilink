import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PostDetails from "./Pages/PostDetails";
import PageNotFound from "./Components/404/PageNotFound";
import Multipage from "./Pages/Multipage/Multipage";
import Layout7 from "./Components/Layout/Layout7";
import AboutPage from "./Pages/Multipage/AboutPage";
import GalleryPage from "./Pages/Multipage/GalleryPage";
import MyAppointmentPage from "./Pages/Multipage/MyAppointmentPage";
import PostPage from "./Pages/Multipage/PostPage";
import ContactPage from "./Pages/Multipage/ContactPage";
import DoctorProfilePage from "./Pages/DoctorProfilePage";
import DoctorProfilePage2 from "./Pages/DoctorProfilePage2";
import DoctorProfilePage3 from "./Pages/DoctorProfilePage3";
import PaymentsMain from "./Pages/Payment/PaymentsMain.jsx";
import PatientMain from "./Pages/Patient/PatientMain.jsx";
import Login from "./Components/Profile/Login.jsx";
import PatientProfileForm from "./Pages/Patient/PatientProfileForm.jsx";
// AuthContext for authentication
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import HealthMain from "./Pages/Health/HealthMain.js";

let logoutTimer;

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // Login function
  const login = useCallback((user, token, expirationDate) => {
    console.log("Start of login function");
    console.log(user, token);
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);

    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1-hour expiration
    setTokenExpirationDate(tokenExpiration);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        user,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsLoggedIn(false);
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
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user: user,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<PatientProfileForm />} />

        <Route path="/" element={<Layout7 />}>
          <Route index element={<Multipage />} />
          <Route path="home" element={<Multipage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="myappointments" element={<MyAppointmentPage />} />
          <Route path="post" element={<PostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="post/:postId" element={<PostDetails />} />
          <Route path="doctor-profile2" element={<DoctorProfilePage2 />} />
          <Route path="doctor-profile3" element={<DoctorProfilePage3 />} />
          <Route path="doctor-profile" element={<DoctorProfilePage />} />

          {/* Route for Payments */}

          <Route path="payment/*" element={<PaymentsMain />} />

          {/* Route for Patient */}
          <Route path="patient/*" element={<PatientMain />} />

          {/* Route for Patient */}
          <Route path="health/*" element={<HealthMain />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

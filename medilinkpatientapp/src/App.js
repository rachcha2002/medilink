import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import PostDetails from "./Pages/PostDetails";
import PageNotFound from "./Components/404/PageNotFound";
import Multipage from "./Pages/Multipage/Multipage";
import Layout7 from "./Components/Layout/Layout7";
import AboutPage from "./Pages/Multipage/AboutPage";
import GalleryPage from "./Pages/Multipage/GalleryPage";
import PricingPage from "./Pages/Multipage/PricingPage";
import PostPage from "./Pages/Multipage/PostPage";
import ContactPage from "./Pages/Multipage/ContactPage";
import DoctorProfilePage from "./Pages/DoctorProfilePage";
import DoctorProfilePage2 from "./Pages/DoctorProfilePage2";
import DoctorProfilePage3 from "./Pages/DoctorProfilePage3";
import PaymentsMain from "./Pages/Payment/PaymentsMain.jsx";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout7 />}>
        <Route index element={<Multipage />} />
        <Route path="home" element={<Multipage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="post" element={<PostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="post/:postId" element={<PostDetails />} />
        <Route path="doctor-profile2" element={<DoctorProfilePage2 />} />
        <Route path="doctor-profile3" element={<DoctorProfilePage3 />} />
        <Route path="doctor-profile" element={<DoctorProfilePage />} />

        {/* Route for Payments */}
        <Route path="payment/*" element={<PaymentsMain />} />


      </Route>
    </Routes>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import Header7 from "../Header/Header7";
import { IMAGES } from "../../constants/images";
// import '../../sass/demo/theme_type3.scss';

const headerData = {
  logo: IMAGES.medilinknobackground,
};

const footerData = {
  logo: IMAGES.medilinknobackground,
  bgImg: "/images/footer-bg.png",
  subTitle:
    " MediLink is a healthcare platform designed to streamline communication and collaboration between patients, healthcare providers, and medical institutions.",
};
const Layout7 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header7 data={headerData} />
          <Outlet />
          <Footer data={footerData} />
        </>
      )}
    </>
  );
};

export default Layout7;

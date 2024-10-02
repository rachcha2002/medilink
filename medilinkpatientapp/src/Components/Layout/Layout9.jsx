import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Header9 from '../Header/Header9';

const headerData = {
  logo: '/images/logo.png',
};

const footerData = {
  logo: '/images/footer-logo.png',
  bgImg: '/images/footer-bg.png',
  subTitle:
    ' Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.',
};
const Layout9 = () => {
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
          <Header9 data={headerData} />
          <Outlet />
          <Footer data={footerData} />
        </>
      )}
    </>
  );
};

export default Layout9;

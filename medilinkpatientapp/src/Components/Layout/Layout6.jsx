import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Header6 from '../Header/Header6';
// import '../../sass/demo/theme_type3.scss';

const headerData = {
  logo: '/images/dental/logo.png',
};

const footerData = {
  logo: '/images/dental/logo.png',
  bgImg: '/images/footer-bg.png',
  subTitle:
    ' Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.',
};
const Layout6 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader varient="st-color1" />
      ) : (
        <>
          <Header6 data={headerData} />
          <Outlet />
          <Footer data={footerData} varient="st-color1" />
        </>
      )}
    </>
  );
};

export default Layout6;

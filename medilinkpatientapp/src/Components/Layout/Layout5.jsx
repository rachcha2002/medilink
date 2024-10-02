import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Header5 from '../Header/Header5';
import Footer from '../Footer/Footer';
// import '../../sass/demo/theme_type2.scss';

const headerData = {
  logo: '/images/dental/logo2.png',
};

const footerData = {
  logo: '/images/dental/logo2.png',
  subTitle:
    ' Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.',
};
const Layout5 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader varient="st-color2" />
      ) : (
        <>
          <Header5 data={headerData} />
          <Outlet />
          <Footer data={footerData} varient="st-color2" />
        </>
      )}
    </>
  );
};

export default Layout5;

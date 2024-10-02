import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import Header4 from '../Header/Header4';
import Footer2 from '../Footer/Footer2';
// import '../../sass/demo/theme_type1.scss';

const headerData = {
  logo: '/images/dental/logo.png',
};

const footerData = {
  logo: '/images/dental/logo.png',
  subTitle:
    ' Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.',
  awardImg: '/images/dental/award1.png',
};
const Layout4 = () => {
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
          <Header4 data={headerData} />
          <Outlet />
          <Footer2 data={footerData} />
        </>
      )}
    </>
  );
};

export default Layout4;

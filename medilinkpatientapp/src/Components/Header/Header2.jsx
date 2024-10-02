import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Header2 = ({ data }) => {
  const {logo} = data;

  const [mobileToggle, setMobileToggle] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowTop = window.scrollY || document.documentElement.scrollTop;

      if (windowTop >= headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setLastScrollTop(windowTop);
    };

    const headerHeight = document.querySelector('.st-sticky-header').offsetHeight + 100;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky, lastScrollTop]);

  return (
    <header className={`st-site-header st-style1 st-sticky-header ${isSticky ? "st-sticky-active" : ""}`}>
      <div className="st-main-header">
        <div className="container-fluid">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <Link className="st-site-branding" to="/">
                <img src={logo} alt={logo} />
              </Link>
            </div>
            <div className="st-main-header-right">
              <div className="st-nav">
                <ul className={`st-nav-list st-onepage-nav ${mobileToggle ? "d-block" : "none"}`}>
                  <li>
                    <ScrollLink to="home" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Home</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="about" spy={true} duration={500} onClick={() => setMobileToggle(false)} >About</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="department" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Department</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="doctors" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Doctors</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="gallery" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Gallery</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="pricing" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Pricing</ScrollLink>
                  </li>
                  <li className="menu-item-has-children">
                    <ScrollLink to="blog" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Blog</ScrollLink>
                    <ul>
                      <li>
                        <Link to="/post/post_details">Single Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ScrollLink to="contact" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Contact</ScrollLink>
                  </li>
                </ul>
                <div className={`st-munu-toggle ${mobileToggle ? "st-toggle-active" : ""} `} onClick={handleMobileToggle}>
                  <span></span>
                </div>
                <ScrollLink
                  to="appointment"
                  className="st-btn st-style2 st-size-medium st-color1 st-smooth-move"
                >
                  Appointment Now!
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header2

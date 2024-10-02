import React, { useEffect, useState } from 'react'
import Social2 from '../Social/Social2'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom';

const Header3 = ({ data }) => {
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
    <header className="st-site-header st-style2 st-sticky-header">
      <div className="st-main-header">
        <div className="container">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <Link className="st-site-branding" to="">
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
              </div>
              <ScrollLink
                to="appointment"
                className="st-btn st-style1 st-color4 st-smooth-move st-size-medium w-100"
              >
                Book An Appointment
              </ScrollLink>
              <div className="st-opening-hr">
                <h4 className="st-opening-hr-title">Opening Hours</h4>
                <div className="st-opening-date">Saterday - Thusday</div>
                <div className="st-opening-time">9:00 AM - 6:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Social2 />
    </header>
  )
}

export default Header3

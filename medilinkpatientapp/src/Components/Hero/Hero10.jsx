import React from 'react'
import HeroSlider2 from '../Slider/HeroSlider2'
import Social from '../Social/Social';
import {Link as ScrollLink } from 'react-scroll';
import parser from 'html-react-parser'

const Hero10 = ({ data }) => {
  const sliderImages = data.sliderImages;
  const heading = data.heading;
  const subHeading = data.subHeading;

  return (
    <>
      <div className='st-height-b125 st-height-lg-b80' id='home'></div>
      <div className="st-hero-wrap st-gray-bg overflow-hidden" id='home'>
        <div className="st-hero st-style1">
          <div className="container">
            <div className="st-hero-text">
              <h1 className="st-hero-title cd-headline slide">{parser(heading)}</h1>
              <div className="st-hero-subtitle">{parser(subHeading)}</div>
              <div className="st-hero-btn">
                <ScrollLink
                  to="appointment"
                  className="st-btn st-style1 st-color1 st-smooth-move"
                >
                  Appointment
                </ScrollLink>
              </div>
            </div>
          </div>
          <div className="st-hero-social-group">
            <div className="container">
              <Social />
            </div>
          </div>
        </div>
        <HeroSlider2 data={sliderImages} />
        {/* .st-slider */}
        <div className="st-hero-shape st-style1">
          <img src="shape/hero-shape2.png" alt="hero shape" />
        </div>
      </div>
    </>
  )
}

export default Hero10;

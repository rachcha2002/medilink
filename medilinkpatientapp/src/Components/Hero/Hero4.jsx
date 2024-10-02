import React from 'react'
import { Link as ScrollLink } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';

const Hero4 = ({ data }) => {

  const titles = data.title;
  const newArray = titles.flatMap(element => [element, 3000]);

  return (
    <>
      <div className='st-height-b125 st-height-lg-b80' id='home'></div>
      <div
        id="home"
        className="st-hero st-style1 st-dynamic-bg st-bg st-fixed-bg"
        style={{ backgroundImage: `url(${data.bgImg})` }}
      >
        <div className="container">
          <div className="st-hero-text st-style1 text-center">
            <h1 className="st-hero-title cd-headline clip cd-headline-style1">
              Take best quality <br />
              Treatment for<span></span>
              <span className="cd-words-wrapper">
                <span> </span>
                <TypeAnimation sequence={newArray}
                  speed={50}
                  repeat={Infinity} />
              </span>
            </h1>
            <div className="st-hero-subtitle">
              The art of medicine consists in amusing the patient while nature cures
              the disease. <br />
              Treatment without prevention is simply unsustainable.
            </div>
            <div className="st-hero-btn-group">
              <ScrollLink
                to="appointment"
                className="st-btn st-style1 st-size-medium st-color1 st-smooth-move"
              >
                Appointment
              </ScrollLink>
              <ScrollLink
                to="about"
                className="st-btn st-style1 st-size-medium st-color3 st-smooth-move"
              >
                About Us
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero4

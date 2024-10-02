import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';

const Hero2 = ({ data }) => {

  const titles = data.title;
  const newArray = titles.flatMap(element => [element, 3000]);

  return (
    <>
      <div className='st-height-b125 st-height-lg-b80' id='home'></div>
      <div id="home" className="st-hero-wrap st-color1 st-gray-bg overflow-hidden st-shape-wrap">
        <div className="st-shape1">
          <img src="/shape/contact-shape1.svg" alt="shape1" />
        </div>
        <div className="st-shape2">
          <img src="/shape/contact-shape2.svg" alt="shape2" />
        </div>
        <div className="st-wave-animation" />
        <div className="st-wave-animation st-wave-animation-2" />
        <div className="st-hero st-style1 text-center">
          <div className="container">
            <div className="st-hero-text">
              <h1 className="st-hero-title cd-headline clip">
                Take best quality <br />
                Treatment for <span></span>
                <span className="cd-words-wrapper">
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
              <div className="st-hero-btn">
                <ScrollLink
                  to="appointment"
                  className="st-btn st-style1 st-color1 st-smooth-move"
                >
                  {' '}
                  Appointment{' '}
                </ScrollLink>
              </div>
              <div className="st-height-b10 st-height-lg-b10" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero2;

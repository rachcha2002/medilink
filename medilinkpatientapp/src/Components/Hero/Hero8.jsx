import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';

const Hero8 = ({ data }) => {
  const bgImg = data.bgImg;
  const titles = data.title;
  const newArray = titles.flatMap(element => [element, 3000]);

  return (
    <>
      <div className='st-height-b125 st-height-lg-b80' id='home'></div>
      <div
        id='home'
        className="st-hero-wrap st-gray-bg st-dynamic-bg overflow-hidden st-fixed-bg st-bg"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="animated-icon-wrap">
          <div className="animated-icon">
            <Icon icon="fa:user-md" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa:heartbeat" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa:hospital-o" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa:medkit" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa-solid:crutch" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa:wheelchair" />
          </div>
          <div className="animated-icon">
            <Icon icon="fa:ambulance" />
          </div>
        </div>
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
                <ScrollLink to="appointment" className="st-btn st-style1 st-color1 st-smooth-move" >
                  Appointment
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

export default Hero8

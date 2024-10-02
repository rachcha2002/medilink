import { React, useEffect, useState } from 'react';
import HeroSlider from '../Slider/HeroSlider';
import { Link as ScrollLink } from 'react-scroll';
import TextTransition, { presets } from 'react-text-transition';


const Hero12 = ({ data }) => {
  const sliderImages = data.sliderImages;
  const title = data.title;

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <div className='st-height-b45 st-height-lg-b45' id='home' ></div>
      <div className="st-hero-wrap overflow-hidden st-gradient" id='home'>
        <div className="st-wave-animation st-white" />
        <div className="st-hero st-style1">
          <div className="container">
            <div className="st-hero-text st-white">
              <div className="st-height-b40 st-height-lg-b40" />
              <h1 className="st-hero-title cd-headline slide">
                Take best quality <br />
                treatment for
                <span className="cd-words-wrapper">
                  <TextTransition springConfig={presets.wobbly}>
                    <span className="st-transition-title">
                      {title[index % title.length]}
                    </span>
                  </TextTransition>
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
                  className="st-btn st-style1 st-color5 st-smooth-move"
                >
                  Appointment
                </ScrollLink>
                <ScrollLink
                  to="about"
                  className="st-btn st-style2 st-color2 st-smooth-move"
                >
                  About Us
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
        <HeroSlider data={sliderImages} />
      </div>
    </>
  );
};

export default Hero12;

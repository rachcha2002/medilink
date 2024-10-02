import { React, useEffect, useState } from 'react';
import HeroSlider from '../Slider/HeroSlider';
import { Link as ScrollLink } from 'react-scroll';
import TextTransition, { presets } from 'react-text-transition';

const Hero5 = ({ data }) => {

  const { sliderImages, title } = data;

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
      <div className='st-height-b125 st-height-lg-b80' id='home'></div>
      <div id="home" className="st-hero-wrap st-color1 overflow-hidden">
        <div className="st-wave-animation" />
        <div className="st-hero st-style1">
          <div className="container">
            <div className="st-hero-text">
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
              <div className="st-hero-btn">
                <ScrollLink
                  to="appointment"
                  className="st-btn st-style1 st-size-medium st-color1 st-smooth-move"
                >
                  Appointment
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
        <HeroSlider data={sliderImages} />
      </div>
    </>
  )
}

export default Hero5

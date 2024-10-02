import React, { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import TextTransition, { presets } from 'react-text-transition'
import parser from 'html-react-parser'

const Hero16 = ({ data }) => {
  const {bgImg, heading, title } = data;

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="st-hero st-style1 st-type3 st-dynamic-bg st-bg" id='home' style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="container">
        <div className="st-hero-in">
          <div className="st-height-b50 st-height-lg-b50" />
          <div className="st-hero-text">
            <h3 className="st-hero-mini-title st-light-blue cd-headline slide">
              <span className="cd-words-wrapper">
                <TextTransition springConfig={presets.wobbly}>
                  <span className="st-transition-title">
                    {title[index % title.length]}
                  </span>
                </TextTransition>
              </span>
            </h3>
            <h1 className="st-hero-title">{parser(heading)}</h1>
            {/* <h1 class="st-hero-title">Our hospital always provides<br> high quality <span class="st-light-blue">dental</span> services </h1> */}
            <div className="st-hero-btn-group">
              <ScrollLink
                to="service"
                className="st-btn st-style1 st-color6 st-smooth-move"
              >
                Our Services
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero16

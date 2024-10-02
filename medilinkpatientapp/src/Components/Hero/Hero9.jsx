import React from 'react'
import parser from 'html-react-parser'
import {Link as ScrollLink } from 'react-scroll';

const Hero9 = ({ data }) => {
  const bgImg = data.bgImg;
  const heading = data.heading;
  const subHeading = data.subHeading;
  const metaTitle = data.metaTitle;

  return (
    <div className="st-hero-wrap overflow-hidden" id="home">
      <div
        className="st-hero st-style1 st-full-screen st-bg st-fixed-bg st-dynamic-bg"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="container">
          <div className="st-hero-text st-style2">
            <div className="st-hero-mini-title">{parser(metaTitle)}</div>
            <h1 className="st-hero-title cd-headline slide">{parser(heading)}</h1>
            <div className="st-height-b20 st-height-lg-b5" />
            <div className="st-hero-subtitle">{parser(subHeading)}</div>
            <div className="st-hero-btn">
              <ScrollLink
                to="appointment"
                className="st-btn st-style1 st-color1 st-smooth-move"
              >
                Buy Nischinto Now!
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Hero9

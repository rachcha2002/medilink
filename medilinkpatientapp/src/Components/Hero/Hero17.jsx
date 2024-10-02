import React from 'react'
import parser from 'html-react-parser'
import {Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';

const Hero17 = ({ data }) => {
  const { bgImg, title, subTitle } = data;

  return (
    <div className="st-hero-wrap overflow-hidden" id="home">
      <div className="st-hero st-style1 st-full-screen st-bg st-fixed-bg st-dynamic-bg" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="container">
          <div className="st-hero-text">
            <h1 className="st-hero-title">{parser(title)}</h1>
            <div className="st-hero-subtitle">{parser(subTitle)}</div>
            <div className="st-hero-btn-group">
              <ScrollLink
                to="appointment"
                className="st-btn st-style1 st-size-medium st-color1 st-smooth-move"
              >
                Appointment
              </ScrollLink>
              <Link to="about" className="st-btn st-style1 st-size-medium st-color3" >
                About Us
              </Link>
            </div>
            <div className="st-height-b15 st-height-lg-b15" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero17

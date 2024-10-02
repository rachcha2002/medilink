import React from 'react'
import parser from 'html-react-parser'
import { Link as ScrollLink } from 'react-scroll'
import VideoBlock3 from '../VideoBlock/VideoBlock3';

const Hero15 = ({ data }) => {
  const { subTitle, title, text, imgSrc, videoSrc } = data;
  return (
    <div className="st-hero st-style1 st-type2">
      <div className="container">
        <div className="st-hero-in">
          <div className="st-hero-text">
            <h3 className="st-hero-mini-title st-pink"> {parser(subTitle)}</h3>
            <h1 className="st-hero-title">{parser(title)}</h1>
            <div className="st-hero-subtitle">{parser(text)}</div>
            <div className="st-hero-btn-group">
              <ScrollLink
                to="service"
                className="st-btn st-style1 st-color4 st-smooth-move"
              >
                Our Services
              </ScrollLink>
            </div>
          </div>
          <VideoBlock3 imgSrc={imgSrc} videoSrc={videoSrc} />
        </div>
      </div>
    </div>
  )
}

export default Hero15

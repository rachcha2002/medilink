import { React, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import TextTransition, { presets } from 'react-text-transition';
import Social from '../Social/Social';
import ReactPlayer from 'react-player';

const Hero7 = ({ data }) => {
  const { bgImg, bgShape, videoSrc, title } = data;

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const playerStyle = {
    position: "absolute",
    zIndex: "0",
    minWidth: "100%",
    minHeight: "100vh",
    left: "0px",
    top: "0px",
    overflow: "hidden",
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: "2000ms",
  }

  return (
    <>
      <div id='home' className="st-hero-wrap st-gray-bg st-dynamic-bg overflow-hidden youtube-bg st-white-overlay" style={{ backgroundImage: `url(${bgImg})` }} >
        {
          videoSrc ? <ReactPlayer className='react-player player' style={playerStyle} url={`${videoSrc}`} playing={true} loop={true} /> : ""
        }
        <div className="st-hero st-style1">
          <div className="container">
            <div className="st-hero-text">
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
              <div className="st-hero-subtitle st-primary-color">
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
          <div className="st-hero-social-group">
            <div className="container">
              <Social />
            </div>
          </div>
        </div>
        <div className="st-hero-shape">
          <img src={bgShape} alt="hero shape" />
        </div>
      </div>

    </>
  )
}

export default Hero7;

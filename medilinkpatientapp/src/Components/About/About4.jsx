import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import parser from 'html-react-parser'

const About4 = ({ data }) => {
  const { imgSrc, title, textLine } = data;
  return (
    <section id="about">
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="st-left-full-width">
              <div className="text-center">
                <img src={imgSrc} alt={imgSrc} />
              </div>
            </div>
          </div>
          {/* .col */}
          <div className="col-xl-6">
            <div className="st-vertical-middle">
              <div className="st-vertical-middle-in">
                <div className="st-text-block st-style1 st-type1">
                  <h2 className="st-text-block-title">{parser(title)}</h2>
                  <div className="st-height-b20 st-height-lg-b20" />
                  <div className="st-text-block-text">
                    {
                      textLine.map((elements, index) => (
                        <p key={index}>{elements.text}</p>
                      ))
                    }
                    <div className="st-height-b15 st-height-lg-b15" />
                    <ScrollLink
                      to="appointment"
                      className="st-btn st-style1 st-color4  st-size-medium st-smooth-move"
                    >
                      Make an Appointment
                    </ScrollLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* .col */}
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>

  )
}

export default About4

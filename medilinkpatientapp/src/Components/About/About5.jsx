import React from 'react'
import BeforeAfter3 from '../BeforeAfter/BeforeAfter3'
import { Icon } from '@iconify/react';
import parser from 'html-react-parser'
import {Link as ScrollLink } from 'react-scroll';

const About5 = ({ data }) => {
  const { title, subTitle, list, afterImg, beforeImg } = data;

  return (
    <section id="about">
      <div className="st-height-b120 st-height-lg-b50" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <BeforeAfter3 beforeImg={beforeImg} afterImg={afterImg} />
          </div>
          {/* .col */}
          <div className="col-lg-6">
            <div className="st-vertical-middle">
              <div className="st-vertical-middle-in">
                <div className="st-text-block st-style1 st-type1 st-space1">
                  {/* st-light-blue */}
                  <h2 className="st-text-block-title">{parser(title)}</h2>
                  <div className="st-height-b10 st-height-lg-b10" />
                  <div className="st-text-block-text">
                    <p>{parser(subTitle)}</p>
                    <div className="st-height-b15 st-height-lg-b15" />
                    <ul className="st-list st-style2 st-color1 st-mp0">
                      {
                        list.map((elements, index) => (
                          <li key={index}>
                            <i><Icon icon="fa:check-circle-o" /></i>{elements.text}
                          </li>
                        ))
                      }
                    </ul>
                    <div className="st-height-b25 st-height-lg-b25" />
                    <ScrollLink
                      to="appointment"
                      className="st-btn st-style1 st-color6 st-size-medium st-smooth-move"
                    >
                      Make an Appointment
                    </ScrollLink>
                    <div className="st-height-b5 st-height-lg-b5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* .col */}
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      {/* Start Logo Carousel */}
    </section>
  )
}

export default About5

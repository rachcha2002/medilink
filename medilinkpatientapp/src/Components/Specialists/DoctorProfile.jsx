import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import parser from 'html-react-parser';

const DoctorProfile = ({ data }) => {
  const { img, name, designation, desc, special, contactInfo, shedule } = data;

  const [isActive, setIsActive] = useState("biography");

  return (
    <>
      <section className="st-shape-wrap">
        <div className="st-shape6">
          <img src="/shape/contact-shape3.svg" alt="shape3" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-3">
              <div className="st-doctors-info-left">
                <div className="st-member st-style1 st-zoom">
                  <div className="st-member-img">
                    <img src={img} alt={img} className="st-zoom-in" />
                    <div className="st-member-social-wrap">
                      <img
                        src="/shape/member-shape.svg"
                        alt="shape"
                        className="st-member-social-bg"
                      />
                      <ul className="st-member-social st-mp0">
                        <li>
                          <Link to="/" target="_blank">
                            <Icon icon="fa6-brands:facebook-square" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/" target="_blank">
                            <Icon icon="fa6-brands:linkedin" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/" target="_blank">
                            <Icon icon="fa6-brands:pinterest-square" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/" target="_blank">
                            <Icon icon="fa6-brands:twitter-square" />
                          </Link>
                        </li>
                        <li>
                          <Link to="/" target="_blank">
                            <Icon icon="fa6-brands:dribbble-square" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-9">
              <div className="st-height-b25 st-height-lg-b25" />
              <div className="st-doctors-info-right">
                <div className="st-doctor-heading">
                  <h3 className="st-doctor-name">{parser(name)}</h3>
                  <div className="st-doctor-designation">{parser(designation)}</div>
                  <div className="st-doctor-desc">{parser(desc)}</div>
                </div>
                <div className="st-height-b20 st-height-lg-b20" />
                <ul className="st-doctors-special st-mp0">
                  {
                    special.map((elements, index) => (
                      <li key={index}>
                        <b>{elements.title}:</b>
                        <span>{elements.desc}</span>
                      </li>
                    ))
                  }
                </ul>
                <div className="st-height-b30 st-height-lg-b30" />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-shedule-wrap st-style1">
                      <div className="st-shedule">
                        <h2 className="st-shedule-title">Contact info</h2>
                        <div className="st-height-b10 st-height-lg-b10" />
                        <ul className="st-footer-contact-list st-mp0">
                          {
                            contactInfo.map((elements, index) => (
                              <li key={index}>
                                <span className="st-footer-contact-title">{elements.title}:</span>
                                {elements.desc}
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-shedule-wrap st-style2">
                      <div className="st-shedule">
                        <h2 className="st-shedule-title">Working hours</h2>
                        <ul className="st-shedule-list">
                          {
                            shedule.map((elements, index) => (
                              <li key={index}>
                                <div className="st-shedule-left">{elements.day}</div>
                                <div className="st-shedule-right">{elements.hours} </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="st-height-b25 st-height-lg-b25" />
                <div className="st-tabs st-fade-tabs st-style2">
                  <ul className="st-tab-links st-style2 st-mp0">
                    <li className={`st-tab-title ${isActive === "biography" ? "active" : ""}`} onClick={() => setIsActive("biography")}>
                      <span>Biography</span>
                    </li>
                    <li className={`st-tab-title ${isActive === "education" ? "active" : ""}`} onClick={() => setIsActive("education")}>
                      <span>Education</span>
                    </li>
                  </ul>
                  <div className="st-height-b25 st-height-lg-b25" />
                  <div className="tab-content">
                    <div id="Biography" className={`st-tab ${isActive === "biography" ? "active" : ""}`}>
                      <div className="st-doctor-details-box">
                        <p>
                          Leverage agile frameworks to provide a robust synopsis for
                          high level overviews. Iterative approaches to corporate
                          strategy foster collaborative thinking to further the
                          overall value proposition. Organically grow the holistic
                          world view of disruptive innovation via workplace diversity
                          and empowerment.
                        </p>
                        <p>
                          Capitalize on low hanging fruit to identify a ballpark value
                          added activity to beta test. Override the digital divide
                          with additional clickthroughs. Capitalize on low hanging
                          fruit to identify a ballpark value added activity to beta
                          test.
                        </p>
                        <p>
                          Nanotechnology immersion along the information highway will
                          close the loop on focusing solely on the bottom line.
                          Override the digital divide with additional clickthroughs
                          immersion along the information.
                        </p>
                      </div>
                    </div>
                    <div id="Education" className={`st-tab ${isActive === "education" ? "active" : ""}`}>
                      <div className="st-doctor-details-box">
                        <ul>
                          <li>
                            PHD degree in Neorology at University of Mediserv (2006)
                          </li>
                          <li>
                            Master of Neoro Surgery at University of Mediserv (2002)
                          </li>
                          <li>
                            MBBS degree in Neurosciences at University of Mediserv
                            (2002)
                          </li>
                          <li>
                            Higher Secondary Certificate at Mediserv collage (1991)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* .st-tabs */}
              </div>
            </div>
          </div>
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
      </section>
    </>
  )
}

export default DoctorProfile

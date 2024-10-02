import React from 'react'
import { Link as ScrollLink } from 'react-scroll'
import parser from 'html-react-parser';
import { Icon } from '@iconify/react';

const Hero13 = ({ data }) => {
  return (
    <>
      <div className='st-height-b125 st-height-lg-b80' id='home' ></div>
      <div className="st-hero-wrap st-color1 st-bg st-dynamic-bg overflow-hidden" style={{ backgroundImage: `url(${data.bgImg})` }} id='home'>
        <div className="st-hero st-style1 st-type1">
          <div className="container">
            <div className="st-hero-text">
              <h1 className="st-hero-title">{parser(data.heading)}</h1>
              {/* <h1 class="st-hero-title">Wellness Builds <br>Upon the Medical.</h1> */}
              {/* <h1 class="st-hero-title">Way to get happy. <br>Best promises.</h1> */}
              <div className="st-hero-subtitle">{parser(data.subHeading)}</div>
              <div className="st-hero-btn">
                <ScrollLink
                  to="department"
                  className="st-btn st-style1 st-color3 st-smooth-move"
                >
                  Departments
                </ScrollLink>
              </div>
            </div>
            <form
              method="POST"
              action="assets/php/appointment.php"
              className="st-appointment-form"
              id="appointment-form"
            >
              <div className="st-wave-animation st-white" />
              <h2 className="st-appointment-form-title text-center">
                Make an Appointment
              </h2>
              <div id="st-alert1" />
              <div className="row">
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <input
                      type="text"
                      id="uname"
                      name="uname"
                      placeholder="Jhon Doe"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <input
                      type="text"
                      id="uemail"
                      name="uemail"
                      placeholder="example@gmail.com"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <input
                      type="text"
                      id="unumber"
                      name="unumber"
                      placeholder="+00 141 23 234"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <input
                      name="udate"
                      type="text"
                      id="udate"
                      placeholder="dd/mm/yy"
                    />
                    <div className="form-field-icon">
                      <Icon icon="fa:calendar-o" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <div className="st-custom-select-wrap">
                      <select
                        name="udepartment"
                        id="udepartment"
                        className="st_select1"
                        data-placeholder="Select department"
                      >
                        <option selected disabled>Select department</option>
                        <option value="dental-care">Dental Care</option>
                        <option value="neurology">Neurology</option>
                        <option value="crutches">Crutches</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="pulmonary">Pulmonary</option>
                        <option value="x-ray">X-Ray</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <div className="st-custom-select-wrap">
                      <select
                        name="udoctor"
                        className="st_select1"
                        id="udoctor"
                        data-placeholder="Doctors"
                      >
                        <option selected disabled>Select Doctor</option>
                        <option value="jhon-doe">Dr. Jhon Doe</option>
                        <option value="mak-rushi">Dr. Mak Roshi</option>
                        <option value="mohoshin-kabir">Dr. Mohoshin Kabir</option>
                        <option value="nayon-borua">Dr. Nayon Borua</option>
                        <option value="rasel-islam">Dr. Rasel Islam</option>
                        <option value="mahid-islam">Dr. Mahid Islam</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="st-form-field st-style1">
                    <textarea
                      cols={30}
                      rows={10}
                      id="umsg"
                      name="umsg"
                      placeholder="Write something here..."
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="st-btn st-style1 st-color1 st-size-medium w-100"
                    type="submit"
                    id="appointment-submit"
                    name="submit"
                  >
                    Check Available Doctors
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero13

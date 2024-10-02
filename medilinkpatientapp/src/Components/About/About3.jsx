import React from 'react'
import SectionHeading2 from '../SectionHeading/SectionHeading2'
import parser from 'html-react-parser'

const About3 = ({data}) => {

  const {bgImg,title,text} = data;

  const sectionHeadingData = {
    "subTitle": "About Us",
    "title": `Learn about our <span className="st-light-blue">hospital</span> <br />
    activities`
  }

  return (
    <section className="st-gray-bg1" id="about">
      <div className="st-height-b120 st-height-lg-b50" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="st-left-full-width">
              <div className="text-center">
                <img src={bgImg} alt={bgImg} />
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
                  <div className="st-text-block-text">{parser(text)}</div>
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

export default About3

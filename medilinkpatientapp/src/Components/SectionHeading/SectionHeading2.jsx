import React from 'react'
import parser from 'html-react-parser'
const SectionHeading2 = ({ data }) => {
  const { title, subTitle } = data;

  return (
    <div className="container">
      <div className="st-section-heading st-style2">
        {
          subTitle ? <div
          className="st-section-heading-subtitle wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <span>{parser(subTitle)}</span>
        </div> : ""
        }
        <h2 className="st-section-heading-title">{parser(title)}</h2>
      </div>
      <div className="st-height-b35 st-height-lg-b35" />
    </div>

  )
}

export default SectionHeading2

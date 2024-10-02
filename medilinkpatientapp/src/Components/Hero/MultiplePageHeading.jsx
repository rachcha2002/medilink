import React from 'react'
import parser from 'html-react-parser'

const MultiplePageHeading = ({ bgImg, title, subTitle }) => {
  return (
    <div className="st-page-heading st-size-md st-style1 st-dynamic-bg" style={{ backgroundImage: `url(${bgImg ? bgImg : ""})` }}>
      <div className="container">
        <div className="st-page-heading-in text-center">
          {
            title ? <h1 className="st-page-heading-title">{parser(title)}</h1> : ""
          }
          {
            subTitle ? <div className="st-page-heading-subtitle">{parser(subTitle)}</div> : ""
          }
        </div>
      </div>
    </div>
  )
}

export default MultiplePageHeading

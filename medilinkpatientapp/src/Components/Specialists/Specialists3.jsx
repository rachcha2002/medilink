import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Specialists3 = ({ img, name, designation, authorLink }) => {
  return (
    <div className="st-member st-style1 st-zoom st-color2">
      <div className="st-member-img">
        <img src={img} alt={img} className="st-zoom-in" />
        <Link className="st-doctor-link" to={authorLink}>
          <i><Icon icon="fa6-solid:link" /></i>
        </Link>
      </div>
      <div className="st-member-meta">
        <div className="st-member-meta-in">
          <h3 className="st-member-name">
            <Link to={authorLink}>{name}</Link>
          </h3>
          <div className="st-member-designation">{designation}</div>
        </div>
      </div>
    </div>
  )
}

export default Specialists3

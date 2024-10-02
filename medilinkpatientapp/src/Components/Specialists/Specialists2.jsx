import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Specialists2 = ({ img, authorLink, name, designation, vairent }) => {
  return (
    <div className={`st-member st-style1 ${vairent} st-zoom st-color1`}>
      <div className="st-member-img">
        <img
          src={img}
          alt={img}
          className="st-zoom-in"
        />
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

export default Specialists2

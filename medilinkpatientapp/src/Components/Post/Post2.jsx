import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Post2 = ({ img, title, subTitle, author, date, postLink, authorLink, varient }) => {
  return (
    <div className="col-lg-4">
      <div className={`st-post st-style3 ${varient}`}>
        <Link
          to={postLink}
          className="st-post-thumb st-link-hover-wrap st-zoom"
        >
          <img
            className="st-zoom-in"
            src={img}
            alt={img}
          />
          <span className="st-link-hover">
            <i><Icon icon="fa6-solid:link" /></i>
          </span>
        </Link>
        <div className="st-post-info">
          <h2 className="st-post-title">
            <Link to={postLink}>{title}</Link>
          </h2>
          <div className="st-post-meta">
            <span className="st-post-date">{date}</span>
            <span>
              Posted by:
              <Link to={authorLink} className="st-post-avatar">
                <span className="st-post-avatar-text">{author}</span>
              </Link>
            </span>
          </div>
          <div className="st-post-text">{subTitle}</div>
        </div>
        <div className="st-post-footer">
          <Link
            to={postLink}
            className={`st-btn st-style2 st-color3 st-size-medium st-rounded`}
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="st-height-b0 st-height-lg-b30" />
    </div>
  )
}

export default Post2

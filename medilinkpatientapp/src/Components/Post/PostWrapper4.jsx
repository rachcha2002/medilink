import React from 'react';
import { Link } from 'react-router-dom';
import Post4 from './Post4';

const PostWrapper4 = ({ data }) => {
  const post = data;
  return (
    <div className="st-content">
      <div className="st-height-b100 st-height-lg-b80" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {
                post.map((elements, index) => (
                  <Post4 {...elements} key={index} />
                ))
              }
              <div className="col-lg-12">
                <ul className="pagination st-post-pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to="">
                      Prev
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="">
                      1
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="">
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="st-height-b0 st-height-lg-b40" />
            <div className="st-widget st-sidebar-widget">
              <h3 className="st-widget-title">Categories</h3>
              <ul className="st-widget-list">
                <li>
                  <Link>Audio</Link>
                </li>
                <li>
                  <Link>Video</Link>
                </li>
                <li>
                  <Link>Gallery</Link>
                </li>
                <li>
                  <Link>Doctors</Link>
                </li>
                <li>
                  <Link>Patients</Link>
                </li>
              </ul>
            </div>
            <div className="st-height-b30 st-height-lg-b30" />
            <div className="st-widget st-sidebar-widget">
              <h3 className="st-widget-title">Arachives</h3>
              <ul className="st-widget-list">
                <li>
                  <Link>March 2020</Link>
                </li>
                <li>
                  <Link>May 2020</Link>
                </li>
                <li>
                  <Link>June 2020</Link>
                </li>
                <li>
                  <Link>August 2020</Link>
                </li>
                <li>
                  <Link>September 2020</Link>
                </li>
                <li>
                  <Link>October 2020</Link>
                </li>
              </ul>
            </div>
            <div className="st-height-b30 st-height-lg-b30" />
            <div className="st-widget st-sidebar-widget">
              <h3 className="st-widget-title">Recent Post</h3>
              <ul className="st-post-widget-list st-mp0">
                {
                  post.slice(0,3).map((elements, index) => (
                    <li key={index}>
                      <div className="st-post st-style1">
                        <Link to={elements.postLink} className="st-post-thumb st-zoom">
                          <img
                            src={elements.img}
                            alt={elements.img}
                            className="st-zoom-in"
                          />
                        </Link>
                        <div className="st-post-info">
                          <h2 className="st-post-title">
                            <Link to={elements.postLink}>
                              Top Medical Tourism Destination...
                            </Link>
                          </h2>
                          <div className="st-post-date">{elements.date}</div>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="st-height-b30 st-height-lg-b30" />
            <div className="st-widget st-sidebar-widget">
              <h3 className="st-widget-title">Popular Tags</h3>
              <div className="st-tagcloud">
                <Link to="" className="st-tag">
                  Gallery
                </Link>
                <Link to="" className="st-tag">
                  Quote
                </Link>
                <Link to="" className="st-tag">
                  Video
                </Link>
                <Link to="" className="st-tag">
                  Quote
                </Link>
                <Link to="" className="st-tag">
                  Audio
                </Link>
                <Link to="" className="st-tag">
                  Doctor
                </Link>
                <Link to="" className="st-tag">
                  Link
                </Link>
                <Link to="" className="st-tag">
                  Ipsum
                </Link>
                <Link to="" className="st-tag">
                  Enviroment
                </Link>
                <Link to="" className="st-tag">
                  Corporate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b100 st-height-lg-b80" />
    </div>
  );
};

export default PostWrapper4

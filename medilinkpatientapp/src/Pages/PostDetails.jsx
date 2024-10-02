import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const PostDetails = () => {
  const postImages = [
    { img: '/images/hero-bg3.jpg' },
    { img: '/images/hero-bg4.jpg' },
    { img: '/images/hero-bg5.jpg' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    loop: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="st-content">
      <div
        className="st-page-heading st-dynamic-bg"
        style={{ backgroundImage: `url('/images/hero-bg2.jpg')` }}
      >
        <div className="container">
          <div className="st-page-heading-in text-center">
            <h4>
              <Link to="/" className="st-back-to-home">
                <Icon icon="ph:arrow-left-bold" />
                Back To Home
              </Link>
            </h4>
            <h1 className="st-page-heading-title">
              This disease occurs when nerve cells <br />
              or neurons in a certain.
            </h1>
            <div className="st-post-label">
              <span>
                By <Link>Jhon Doe</Link>
              </span>
              <span>Jan 02, 2020</span>
            </div>
          </div>
        </div>
      </div>
      {/* .st-page-heading */}
      <div className="st-height-b100 st-height-lg-b80" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="st-post-details st-style1">
              <p>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring.
              </p>
              <p>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps.
              </p>
              <img
                className="st-zoom-in"
                src="/images/hero-bg3.jpg"
                alt="blog1"
              />
              <h2>Collaboratively administrate empowered.</h2>
              <div className="st-post-info">
                <div className="st-post-text">
                  <p>
                    Podcasting operational change management inside of workflows
                    to establish a framework. Taking seamless key performance
                    indicators offline to maximise the long tail. Keeping your
                    eye on the ball while performing a deep dive on the start-up
                    mentality to derive convergence on cross-platform
                    integration.
                  </p>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits. Dramatically visualize
                    customer directed convergence without revolutionary ROI.
                  </p>
                  <p>
                    Podcasting operational change management inside of workflows
                    to establish a framework. Taking seamless key performance
                    indicators offline to maximise the long tail.
                  </p>
                  <h2>Blog video post can also added.</h2>
                  {/* For Youtube */}
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      title="embeded video"
                      className="embed-responsive-item"
                      width={816}
                      height={459}
                      src="https://www.youtube.com/embed/vGOL7ZvuGMc"
                      allowFullScreen=""
                    ></iframe>
                  </div>
                  {/* For Vimeo */}
                  {/* <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" width="816" height="459" src="https://player.vimeo.com/video/172077385?title=0&st-byline=0&portrait=0&color=EE5A3F&autoplay=0&loop=0&wmode=transparent" allowfullscreen></iframe>
          </div> */}
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas. Dynamically innovate
                    resource-leveling customer service for state of the art
                    customer service.
                  </p>
                  <blockquote>
                    Integer accumsan arcu ligula, eget dictum augue egestas sed.
                    Curabitur bibendum, lorem ac dapibus pellentesque, justo
                    lectus bibendum enim.
                    <small>
                      by: <span>Mark Parker</span>
                    </small>
                  </blockquote>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use
                    passage of Lorem Ipsum.
                  </p>
                  <h2>Phosfluorescently engage worldwide?</h2>
                  <p>
                    Proactively envisioned multimedia based expertise and
                    cross-media growth strategies. Seamlessly visualize quality
                    intellectual capital without superior collaboration and
                    idea-sharing. Holistically pontificate installed base
                    portals after maintainable products.
                  </p>
                  <Slider {...settings} className="st-slider-style1">
                    {postImages.map((elements, index) => (
                      <img
                        key={index}
                        className="st-gallery-img st-style1 st-dynamic-bg st-bg"
                        src={elements.img}
                        alt={elements.img}
                      />
                    ))}
                  </Slider>
                </div>
              </div>
              {/* .st-slider */}
              <div className="st-height-b20 st-height-lg-b20" />
              <p>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line.
              </p>
              <div className="st-height-b35 st-height-lg-b35" />
              <div className="st-post-meta">
                <div className="st-post-tages">
                  <h4 className="st-post-tage-title">Tags:</h4>
                  <ul className="st-post-tage-list st-mp0">
                    <li>
                      <Link to="">app</Link>
                    </li>
                    <li>
                      <Link to="">php</Link>
                    </li>
                    <li>
                      <Link to="">web</Link>
                    </li>
                    <li>
                      <Link to="">business</Link>
                    </li>
                    <li>
                      <Link to="">agency</Link>
                    </li>
                    <li>
                      <Link to="">development</Link>
                    </li>
                  </ul>
                </div>
                <div className="st-post-share">
                  <h4 className="st-post-share-title">Share:</h4>
                  <div className="st-post-share-btn-list">
                    <Link to="">
                      <Icon icon="fa6-brands:facebook-f" />
                    </Link>
                    <Link to="">
                      <Icon icon="fa6-brands:twitter" />
                    </Link>
                    <Link to="">
                      <Icon icon="fa6-brands:behance" />
                    </Link>
                    <Link to="">
                      <Icon icon="fa6-brands:instagram" />
                    </Link>
                    <Link to="">
                      <Icon icon="fa6-brands:pinterest-p" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="st-height-b60 st-height-lg-b60" />
              <div className="st-post-btn-gropu">
                <Link
                  to=""
                  className="st-btn st-style2 st-color1 st-size-medium"
                >
                  Previous Post
                </Link>
                <Link
                  to=""
                  className="st-btn st-style2 st-color1 st-size-medium"
                >
                  Next Post
                </Link>
              </div>
              <div className="st-height-b60 st-height-lg-b60" />
              <div className="comments-area">
                <div className="comment-list-outer">
                  <h2 className="comments-title">Comments(3)</h2>
                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author">
                            <img
                              src="/images/comment1.jpg"
                              alt="comment1"
                              className="avatar"
                            />
                            <Link to="" className="nm">
                              Smith Jhon
                            </Link>
                          </div>
                          {/* .comment-author */}
                          <div className="comment-metadata">
                            <Link to="">
                              <span>15 Jan, 2020</span>
                            </Link>
                          </div>
                          {/* .comment-metadata */}
                        </div>
                        {/* .comment-meta */}
                        <div className="comment-content">
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit.
                          </p>
                        </div>
                        <div className="reply">
                          <Link to="" className="comment-reply-link">
                            <Icon icon="fa6-solid:reply" />
                            <span>Reply</span>
                          </Link>
                        </div>
                      </div>
                      <ol className="children">
                        <li className="comment">
                          <div className="comment-body">
                            <div className="comment-meta">
                              <div className="comment-author">
                                <img
                                  src="/images/comment2.jpg"
                                  alt="comment1"
                                  className="avatar"
                                />
                                <span className="nm">
                                  <Link to="">Robat Newman</Link>
                                </span>
                              </div>
                              {/* .comment-author */}
                              <div className="comment-metadata">
                                <Link to="">
                                  <span>15 Jan, 2020</span>
                                </Link>
                              </div>
                              {/* .comment-metadata */}
                            </div>
                            {/* .comment-meta */}
                            <div className="comment-content">
                              <p>
                                Consectetuer adipiscing elit. Lorem ipsum dolor
                                sit amet, consectetuer.
                              </p>
                            </div>
                            <div className="reply">
                              <Link to="" className="comment-reply-link">
                                <Icon icon="fa6-solid:reply" />
                                <span>Reply</span>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ol>
                      {/* .children */}
                    </li>
                    <li className="comment">
                      <div className="comment-body">
                        <div className="comment-meta">
                          <div className="comment-author">
                            <img
                              src="/images/comment1.jpg"
                              alt="comment1"
                              className="avatar"
                            />
                            <span className="nm">
                              <Link to="">Hannibal Lecter</Link>
                            </span>
                          </div>
                          {/* .comment-author */}
                          <div className="comment-metadata">
                            <Link to="">
                              <span>26 Jan, 2016</span>
                            </Link>
                          </div>
                          {/* .comment-metadata */}
                        </div>
                        {/* .comment-meta */}
                        <div className="comment-content">
                          <p>
                            Lorem ipsum dolor sit amet. Lorem ipsum adipiscing
                            elit.
                          </p>
                        </div>
                        <div className="reply">
                          <Link to="" className="comment-reply-link">
                            <Icon icon="fa6-solid:reply" />
                            <span>Reply</span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ol>
                  {/* .comment-list */}
                </div>
                {/* .comment-list-outer */}
                <div className="comment-respond">
                  <h2 className="comment-reply-title">Add your comment</h2>
                  <form method="post" className="comment-form">
                    <p className="comment-form-author">
                      <input
                        name="author"
                        type="text"
                        placeholder="Name*"
                        required=""
                      />
                    </p>
                    <p className="comment-form-email">
                      <input
                        name="email"
                        type="email"
                        placeholder="E-mail*"
                        required=""
                      />
                    </p>
                    <p className="comment-form-url">
                      <input
                        id="url"
                        name="url"
                        type="url"
                        placeholder="Website"
                      />
                    </p>
                    <p className="comment-form-comment">
                      <textarea
                        name="comment"
                        cols={40}
                        rows={5}
                        placeholder="Write here...*"
                        required=""
                      />
                    </p>
                    <p className="form-submit">
                      <button
                        type="submit"
                        className="st-btn st-style1 st-color1 st-size-medium"
                      >
                        Send Message
                      </button>
                    </p>
                  </form>
                </div>
                {/* .comment-respond */}
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
                <li>
                  <div className="st-post st-style1">
                    <Link to="" className="st-post-thumb st-zoom">
                      <img
                        src="/images/rs-post1.jpg"
                        alt="post1"
                        className="st-zoom-in"
                      />
                    </Link>
                    <div className="st-post-info">
                      <h2 className="st-post-title">
                        <a href="blog-details-right-sidebar.html">
                          Top Medical Tourism Destination...
                        </a>
                      </h2>
                      <div className="st-post-date">Jan 22, 2020</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="st-post st-style1">
                    <Link to="" className="st-post-thumb st-zoom">
                      <img
                        src="/images/rs-post2.jpg"
                        alt="post2"
                        className="st-zoom-in"
                      />
                    </Link>
                    <div className="st-post-info">
                      <h2 className="st-post-title">
                        <a href="blog-details-right-sidebar.html">
                          Overview Malaysia as a medical tourism...
                        </a>
                      </h2>
                      <div className="st-post-date">Jan 15, 2020</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="st-post st-style1">
                    <Link to="" className="st-post-thumb st-zoom">
                      <img
                        src="/images/rs-post3.jpg"
                        alt="post2"
                        className="st-zoom-in"
                      />
                    </Link>
                    <div className="st-post-info">
                      <h2 className="st-post-title">
                        <a href="blog-details-right-sidebar.html">
                          World Parkinson’s Day 2020 comes...
                        </a>
                      </h2>
                      <div className="st-post-date">Jan 05, 2020</div>
                    </div>
                  </div>
                </li>
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

export default PostDetails;

import { Icon } from '@iconify/react';
import React from 'react'
import { Link as ScrollLink } from 'react-scroll';
import Slider from 'react-slick';
import parser from 'html-react-parser';

const Hero14 = ({ data }) => {


  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div {...props} className={'slick-arrow-left slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')} aria-hidden="true" aria-disabled={currentSlide === 0 ? true : false} >
      <Icon icon="fa-solid:angle-left" />
    </div>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div {...props} className={'slick-arrow-right slick-arrow' + (currentSlide === slideCount - 1 ? ' slick-disabled' : '')} aria-hidden="true" aria-disabled={currentSlide === slideCount - 1 ? true : false} >
      <Icon icon="fa-solid:angle-right" />
    </div>
  );

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    loop: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />
  }

  return (
    <>
      <div className='st-height-b130 st-height-lg-b80' id='home' />
      <Slider {...settings} className='st-slider-style1' >
        {data.map((elements, index) => (
          <div className="st-hero st-style1 st-size1 st-type1" key={index}>
            <div className="st-hero-bg st-dynamic-bg st-bg" style={{ backgroundImage: `url(${elements.bgImg})` }} />
            <div className="container">
              <div className="st-hero-text">
                <h1 className="st-hero-title">{parser(elements.title)}</h1>
                <div className="st-hero-subtitle">{parser(elements.subTitle)}</div>
                <div className="st-hero-btn-group">
                  <ScrollLink
                    to="appointment"
                    className="st-btn st-style1 st-type1 st-color6 st-smooth-move"
                  >
                    Our Services
                  </ScrollLink>
                </div>
                <div className="st-height-b15 st-height-lg-b15" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default Hero14

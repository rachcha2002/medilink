import React from 'react'
import Slider from 'react-slick'
import SectionHeading2 from '../SectionHeading/SectionHeading2'
import { Icon } from '@iconify/react';

const ServiceSlider = ({ data, varient }) => {
  const { sectionHeadingData, services } = data;
  
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
    dots: false,
    autoplay: true,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          dots: true
        }
      }
    ]
  }

  return (
    <section id="service" className={`${varient === "st-type1" ? "" : "st-bluis-bg"}`}>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <Slider {...settings} className='st-slider-style3'>
          {services.map((elements, index) => (
            <div className={`st-imagebox st-style3 ${varient} st-zoom text-center`} key={index}>
              <div className="st-imagebox-img">
                <img
                  src={elements.img}
                  alt={elements.img}
                  className="st-zoom-in"
                />
              </div>
              <div className="st-imagebox-info">
                <h2 className="st-imagebox-title">{elements.title}</h2>
                <div className="st-imagebox-subtitle">{elements.text}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default ServiceSlider

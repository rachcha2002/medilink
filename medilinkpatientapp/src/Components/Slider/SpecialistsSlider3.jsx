import React from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import Specialists3 from '../Specialists/Specialists3';
import SectionHeading2 from '../SectionHeading/SectionHeading2';

const SpecialistsSlider3 = ({ data }) => {
  const { sectionHeadingData, doctors } = data;

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
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 4,
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
    <section id="doctors" className='st-gray-bg2'>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <Slider {...settings} className='st-slider-style2'>
          {
            doctors.map((elements, index) => (
              <Specialists3 {...elements} key={index} />
            ))
          }
        </Slider>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default SpecialistsSlider3;

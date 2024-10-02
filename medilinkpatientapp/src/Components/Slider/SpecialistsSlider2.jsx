import React from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import SectionHeading2 from '../SectionHeading/SectionHeading2';
import Specialists2 from '../Specialists/Specialists2';



const SpecialistsSlider2 = ({ data, varient }) => {
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

  const sectionHeadingData = {
    "subTitle": `Our Doctors`,
    "title": `Professional staff at our <br><span class="st-light-blue">dental</span> hospital`
  }

  return (
    <section id="doctors" className='st-gray-bg1'>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <Slider {...settings} className='st-slider-style2'>
          {
            data.map((elements, index) => (
              <Specialists2 {...elements} key={index} vairent={varient} />
            ))
          }
        </Slider>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  )
}

export default SpecialistsSlider2;

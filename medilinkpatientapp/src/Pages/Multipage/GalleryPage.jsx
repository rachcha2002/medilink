import React from 'react'
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading'
import MasonryGallery2 from '../../Components/Gallery/Gallery2'

const heroData = {
  bgImg: `/images/hero-bg3.jpg`,
  title: `View our gallery`,
  subTitle: `This is our moment.`
}

const GalleryPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <MasonryGallery2 />
    </>
  )
}

export default GalleryPage

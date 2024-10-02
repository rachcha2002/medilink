import React from 'react'
import LocationInMap from '../../Components/Map/LocationInMap';
import Contact4 from '../../Components/Contact/Contact4';
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading';

const heroData = {
  bgImg: `/images/hero-bg5.jpg`,
  title: `Stay connect with us`,
  subTitle: `Our dedicated team is available 20/7.`
}

const mapLocationURL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d193175.30893635444!2d-74.373409!3d40.841927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy%20Meadows%20Wetlands!5e0!3m2!1sen!2sbd!4v1701067943819!5m2!1sen!2sbd';

const ContactPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <Contact4 />
      <LocationInMap data={mapLocationURL} />
    </>
  )
}

export default ContactPage

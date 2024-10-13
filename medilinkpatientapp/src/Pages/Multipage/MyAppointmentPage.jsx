import React from 'react'
import Price3 from '../../Components/Price/Price3'
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading'

const heroData = {
  bgImg: `/images/hero-bg4.jpg`,
  title: `My Appointments`,
} 

const MyAppointmentPage = () => {
  return (
    <>
 <MultiplePageHeading {...heroData} />
    </>
  )
}

export default MyAppointmentPage

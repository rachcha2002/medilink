import React from 'react'
import DoctorProfile3 from '../Components/Specialists/DoctorProfile3'
import Appointment4 from '../Components/Appointment/Appointment4'
import Spacing from '../Components/Spacing/Spacing'

const doctorData = {
  img: `/images/member1.jpg`,
  name: `Dr. Jeanette Hoff`,
  designation: `Paediatric Surgeon`,
  desc: `M.S, M.Ch (Paediatric Surgery)<br/>
  Medic General Medical Hospital<br/>
  North Houston, Taxas, USA`,
  special: [
    {
      title: `Speciality`,
      desc: `Paediatric, Laparoscopy`
    },
    {
      title: `Experience`,
      desc: `22 Years+`
    },
    {
      title: `Languages`,
      desc: `English, Spanish`
    },
    {
      title: `Types Of`,
      desc: `Full Time Physician`
    },
  ],
  contactInfo: [
    {
      title: `Address`,
      desc: `1223 Fulton Street San Diego CA 941-23 USA`
    },
    {
      title: `Email`,
      desc: `nischinto@gmail.com`
    },
    {
      title: `Phone`,
      desc: `(+01) - 234 567 890`
    },
  ],
  shedule: [
    {

      day: `Sun-Thu`,
      hours: `8:00am–7:00pm`
    },
    {

      day: `Saterday`,
      hours: `11:00am–6:00pm`
    },
    {

      day: `Friday`,
      hours: `Off Day`
    },
  ],
}

const DoctorProfilePage3 = () => {
  return (
    <>
      <Spacing lg={120} md={80} />
      <DoctorProfile3 data={doctorData} />
      <hr />
      <Appointment4 />
    </>
  )
}

export default DoctorProfilePage3

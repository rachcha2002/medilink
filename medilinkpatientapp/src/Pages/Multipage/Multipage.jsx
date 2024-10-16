import React from "react";
import Hero3 from "../../Components/Hero/Hero3";
import Department from "../../Components/Department/Department";
import SpecialistsSlider from "../../Components/Slider/SpecialistsSlider";
import Appointment from "../../Components/Appointment/Appointment";
import TestimonialSlider from "../../Components/Slider/TestimonialSlider";
import Spacing from "../../Components/Spacing/Spacing";
import About6 from "../../Components/About/About6";
import Iconbox from "../../Components/Iconbox/Iconbox";
import { useAuthContext } from "../../Context/AuthContext";

const heroData = [
  {
    title: "Safe your own health. <br /> Get best Service.",
    subTitle:
      "A centralized system where patients can easily connect with health professionals.",
    bgImg: "/images/hero-bg13.jpg",
  },
  {
    title: "Safe your own health. <br /> Get best Service.",
    subTitle:
      "A centralized system where patients can easily connect with health professionals.",
    bgImg: "/images/hero-bg6.jpg",
  },
  {
    title: "Safe your own health. <br /> Get best Service.",
    subTitle:
      "A centralized system where patients can easily connect with health professionals.",
    bgImg: "/images/hero-bg.jpg",
  },
];

const iconboxData = [
  {
    bg: "purple",
    icon: "/icons/icon1.svg",
    title: "Qualified Doctors",
    subTitle:
      "Expert care from certified professionals who put your health first.",
  },
  {
    bg: "green",
    icon: "/icons/icon2.svg",
    title: "24 Hours Service",
    subTitle:
      "Around-the-clock care whenever you need it, because your health doesn’t take a break.",
  },
  {
    bg: "red",
    icon: "/icons/icon3.svg",
    title: "Need Emergency",
    subTitle:
      "Immediate care for life’s unexpected moments. Emergency services available.",
  },
];

const aboutData = {
  title:
    "MediLink is a platform that connects patients with healthcare professionals.",
  subTitle:
    "  MediLink is a healthcare platform designed to streamline communication and collaboration between patients, healthcare providers, and medical institutions. It leverages digital technologies to create a seamless connection between various healthcare stakeholders, allowing for better management of medical records, prescriptions, appointments, and more.",

  avater: {
    img: "/images/avatar1.png",
    name: "David Ambrose",
    designation: "Founder & Director",
  },
  timeTable: [
    {
      day: "Monday",
      startTime: "8:00",
      endTime: "7:00",
    },
    {
      day: "Tuesday",
      startTime: "9:00",
      endTime: "6:00",
    },
    {
      day: "Wednesday",
      startTime: "9:00",
      endTime: "6:00",
    },
    {
      day: "Thursday",
      startTime: "8:00",
      endTime: "7:00",
    },
    {
      day: "Friday",
      startTime: "9:00",
      endTime: "5:00",
    },
    {
      day: "Saturday",
      startTime: "8:00",
      endTime: "7:00",
    },
    {
      day: "Sunday",
      startTime: "9:00",
      endTime: "3:00",
    },
  ],
  contact: "(+94) - 71 152 1161",
};

const testimonialData = [
  {
    img: "/images/avatar2.png",
    name: "Ralph Jones",
    designation: "Executive",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
  {
    img: "/images/avatar3.png",
    name: "Francis Jara",
    designation: "Biographer",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
  {
    img: "/images/avatar4.png",
    name: "David Baer",
    designation: "UX Designer",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
  {
    img: "/images/avatar2.png",
    name: "Ralph Jones",
    designation: "Executive",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
  {
    img: "/images/avatar3.png",
    name: "Francis Jara",
    designation: "Biographer",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
  {
    img: "/images/avatar4.png",
    name: "David Baer",
    designation: "UX Designer",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text.",
  },
];

const Multipage = () => {
  const auth = useAuthContext();
  return (
    <>
      <Hero3 data={heroData} />
      <About6 data={aboutData} />
      <Iconbox data={iconboxData} varient="st-type2" />
      <Spacing lg={120} md={80} />
      <hr />
      <Department />
      <hr />

      {auth.isLoggedIn && <Appointment />}
      <TestimonialSlider data={testimonialData} />
    </>
  );
};

export default Multipage;

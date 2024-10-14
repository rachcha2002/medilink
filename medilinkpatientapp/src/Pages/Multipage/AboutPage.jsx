import React from "react";
import MultiplePageHeading from "../../Components/Hero/MultiplePageHeading";
import Funfact from "../../Components/Funfact/Funfact";
import Accordion from "../../Components/Accordion/Accordion";
import Newsletter from "../../Components/Newsletter/Newsletter";
import About6 from "../../Components/About/About6";

const heroData = {
  bgImg: `/images/hero-bg9.jpg`,
  title: `About MediLink`,
  subTitle: `Streamline your healthcare communication and collaboration with MediLink. Connect with patients, healthcare providers, and medical institutions.`,
};

const aboutData = {
  title:
    "MediLink is a healthcare platform designed to streamline communication and collaboration between patients, healthcare providers, and medical institutions.",
  subTitle:
    "  It leverages digital technologies to create a seamless connection between various healthcare stakeholders, allowing for better management of medical records, prescriptions, appointments, and more.",

  avater: {
    img: "/images/OctagonIT.png",
    name: "OctagonIT Team",
    designation: "Kavinda,Rachith,Tharindu,Githadi",
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
  contact: "(+01) - 234 567 890",
};

const faqData = {
  title: "Just Answer the Questions",
  img: "/images/faq-img.png",
  bgImg: "/shape/faq-bg.svg",
  faqItems: [
    {
      title: "What is Medi solution?",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: "How do I get a refill on my prescription?",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: "How competent our total treatment?",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: "If I get sick what should I do?",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: "What is emergency cary to your hospital?",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
  ],
};

const newsletterData = {
  bgImg: "/images/news-letter-bg.png",
  contact: "(+94) - 71 152 1161",
};

const AboutPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <About6 data={aboutData} />
      <Funfact />

      <Accordion data={faqData} />
      <Newsletter data={newsletterData} />
    </>
  );
};

export default AboutPage;

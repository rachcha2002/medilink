import React from 'react'
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading'
import Funfact from '../../Components/Funfact/Funfact';
import PriceSlider from '../../Components/Slider/PriceSlider';
import Accordion from '../../Components/Accordion/Accordion';
import Newsletter from '../../Components/Newsletter/Newsletter';
import About6 from '../../Components/About/About6';

const heroData = {
  bgImg: `/images/hero-bg9.jpg`,
  title: `About Nischinto`,
  subTitle: `Thousands of people love our service`
}

const aboutData = {
  title:
    'A hospital is a health care institution providing patient treatment with specialized medical',
  subTitle:
    '  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid unt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamc  laboris nisi ut aliquip. Commodo consequat.<br /><br />  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid unt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamc laboris nisi ut aliquip. Commodo consequat. Sed do eiusmod  tempor incidid unt labore et dolore magna aliqua.',

  avater: {
    img: '/images/avatar1.png',
    name: 'David Ambrose',
    designation: 'Founder & Director',
  },
  timeTable: [
    {
      day: 'Monday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Tuesday',
      startTime: '9:00',
      endTime: '6:00',
    },
    {
      day: 'Wednesday',
      startTime: '9:00',
      endTime: '6:00',
    },
    {
      day: 'Thursday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Friday',
      startTime: '9:00',
      endTime: '5:00',
    },
    {
      day: 'Saturday',
      startTime: '8:00',
      endTime: '7:00',
    },
    {
      day: 'Sunday',
      startTime: '9:00',
      endTime: '3:00',
    },
  ],
  contact: '(+01) - 234 567 890',
};

const priceData = [
  {
    title: 'Blood Test',
    price: '39',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '0',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Hemoglobin Test',
    price: '89',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Homocysteine Test',
    price: '150',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '1',
      },
    ],
  },
  {
    title: 'Blood Test',
    price: '39',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '0',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Hemoglobin Test',
    price: '89',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '0',
      },
    ],
  },
  {
    title: 'Homocysteine Test',
    price: '150',
    featureList: [
      {
        title: 'First Description',
        status: '1',
      },
      {
        title: 'Second Description',
        status: '1',
      },
      {
        title: 'Third Description',
        status: '1',
      },
      {
        title: 'Fourth Description',
        status: '1',
      },
      {
        title: 'Fifth Description',
        status: '1',
      },
    ],
  },
];

const faqData = {
  title: 'Just Answer the Questions',
  img: '/images/faq-img.png',
  bgImg: '/shape/faq-bg.svg',
  faqItems: [
    {
      title: 'What is Medi solution?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'How do I get a refill on my prescription?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'How competent our total treatment?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'If I get sick what should I do?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      title: 'What is emergency cary to your hospital?',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
  ],
};

const newsletterData = {
  bgImg: '/images/news-letter-bg.png',
  contact: '(+01) - 234 567 890',
};

const AboutPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <About6 data={aboutData} />
      <Funfact />
      <PriceSlider data={priceData} />
      <Accordion data={faqData} />
      <Newsletter data={newsletterData}/>
    </>
  )
}

export default AboutPage

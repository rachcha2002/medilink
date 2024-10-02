import React from 'react'
import Price3 from '../../Components/Price/Price3'
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading'


const heroData = {
  bgImg: `/images/hero-bg4.jpg`,
  title: `Show our pricing plans`,
  subTitle: `Take a look of our plan and contact us.`
}

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


const PricingPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <Price3 data={priceData} />
    </>
  )
}

export default PricingPage

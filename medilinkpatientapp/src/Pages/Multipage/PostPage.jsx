import React from 'react'
import MultiplePageHeading from '../../Components/Hero/MultiplePageHeading'
import PostWrapper4 from '../../Components/Post/PostWrapper4'

const heroData = {
  bgImg: `/images/hero-bg6.jpg`,
  title: `Our Latest News`,
  subTitle: `Gate all update news here`
}

const postData = [
  {
    img: '/images/blog1.jpg',
    title: 'Working in emergency medicine',
    date: 'Aug 23, 2020',
    author: 'Albert Brian',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog2.jpg',
    title: 'Individual treatment & assistance',
    date: 'Aug 22, 2020',
    author: 'William Juarez',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog3.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog4.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog5.jpg',
    title: 'Working in emergency medicine',
    date: 'Aug 23, 2020',
    author: 'Albert Brian',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog6.jpg',
    title: 'Individual treatment & assistance',
    date: 'Aug 22, 2020',
    author: 'William Juarez',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog7.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
  {
    img: '/images/blog8.jpg',
    title: 'Child’s first hospital visit',
    date: 'Aug 21, 2020',
    author: 'Jamse Lewis',
    authorLink: '',
    subTitle:
      "Lorem Ipsum is simply dummy text of the print ing and typesetting industry. lorem Ipsum the industry's standard dummy text.",
    postLink: 'post_details',
  },
];

const PostPage = () => {
  return (
    <>
      <MultiplePageHeading {...heroData} />
      <PostWrapper4 data={postData} />
    </>
  )
}

export default PostPage

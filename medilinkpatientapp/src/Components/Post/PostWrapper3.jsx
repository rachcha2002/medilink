import React from 'react'
import SectionHeading2 from '../SectionHeading/SectionHeading2';
import Post3 from './Post3';

const PostWrapper3 = ({ data, varient }) => {
  const { sectionHeadingData, posts } = data;
  const post = posts.slice(0, 3);

  return (
    <section id="blog">
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading2 data={sectionHeadingData} />
      <div className="container">
        <div className="row">
          {
            post.map((elements, index) => (
              <Post3 {...elements} key={index} varient={varient} />
            ))
          }
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>

  )
}

export default PostWrapper3

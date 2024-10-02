import React from 'react'
import SectionHeading2 from '../SectionHeading/SectionHeading2';
import Post2 from './Post2';

const PostWrapper2 = ({ data, varient }) => {
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
              <Post2 {...elements} key={index} varient={varient} />
            ))
          }
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>

  )
}

export default PostWrapper2

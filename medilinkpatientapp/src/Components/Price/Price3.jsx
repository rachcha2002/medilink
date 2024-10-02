import React from 'react'
import Price from './Price';
import Spacing from '../Spacing/Spacing';

const Price3 = ({ data }) => {
  console.log(data);
  return (
    <section>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="row">
          {
            data.map((element, index) => (
              <div className="col-lg-4" key={index}>
                <Price {...element} varient={'no-hover'} />
                <Spacing lg={30} md={30} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="st-height-b90 st-height-lg-b50" />
    </section>
  )
}

export default Price3

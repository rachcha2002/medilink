import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants/images';

const PaymentFailure = () => {
  return (
    <section id="payment-unsuccessful">
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="st-imagebox st-style2">
          <div className="row">
            <div className="col-lg-6">
              <div className="st-imagebox-img">
                <img src={IMAGES.failedpay} alt="Payment Unsuccessful" />
              </div>
              <div className="st-height-b0 st-height-lg-b30" />
            </div>
            <div className="col-lg-6">
              <div className="st-vertical-middle">
                <div className="st-vertical-middle-in">
                  <div className="st-imagebox-info">
                    <h2 className="st-imagebox-title">
                      Payment <span>Unsuccessful!</span>
                    </h2>
                    <h4 className="st-imagebox-subtitle">
                      Unfortunately, your transaction could not be completed.
                    </h4>
                    <div className="st-imagebox-text">
                      Something went wrong during the payment process. Please check your payment details and try again.
                      If the problem persists, contact our support team for assistance.
                    </div>
                  </div>
                  <div className="st-imagebox-btn">
                    <Link to="/retry-payment"
                      className="st-btn st-style1 st-size-medium st-color1 mb-3"
                    >
                       My Payments
                    </Link>
                  </div>
                  <div className="st-imagebox-btn">
                    <Link to="/contact-support"
                      className="st-btn st-style1 st-size-medium st-color2"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  );
};

export default PaymentFailure;

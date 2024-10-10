import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants/images';

const PaymentSuccess = () => {
  return (
    <section id="payment-successful">
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="st-imagebox st-style2">
          <div className="row">
            <div className="col-lg-6">
              <div className="st-imagebox-img">
                <img src={IMAGES.successpay} alt="Payment Successful" />
              </div>
              <div className="st-height-b0 st-height-lg-b30" />
            </div>
            <div className="col-lg-6">
              <div className="st-vertical-middle">
                <div className="st-vertical-middle-in">
                  <div className="st-imagebox-info">
                    <h2 className="st-imagebox-title">
                      Payment <span>Successful!</span>
                    </h2>
                    <h4 className="st-imagebox-subtitle">
                      Thank you for your payment. Your transaction has been completed successfully.
                    </h4>
                    <div className="st-imagebox-text">
                      You will receive a confirmation email shortly with the details of your purchase. 
                      We appreciate your business, and if you have any questions, feel free to reach out.
                    </div>
                  </div>
                  <div className="st-imagebox-btn">
                    <Link to="/dashboard"
                      className="st-btn st-style1 st-size-medium st-color1"
                    >
                      Go to Dashboard
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

export default PaymentSuccess;

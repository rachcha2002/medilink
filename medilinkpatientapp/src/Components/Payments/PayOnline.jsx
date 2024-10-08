import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import axios from 'axios';

const PayOnline = () => {
  const [loading, setLoading] = useState(false);
  const [billNo, setBillNo] = useState('');
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setBillNo(event.target.value);
  };

  const handleSearchBill = async () => {
    setLoading(true);
    setError('');
    setBillDetails(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/payment/billing/billno/${billNo}`);
      const data = response.data;

      // Check if the bill status is "Pending"
      if (data.paymentStatus === 'Pending') {
        setBillDetails(data);
      } else {
        setError('Payment already completed or invalid status.');
      }
    } catch (error) {
      setError('Bill not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayOnline = () => {
    alert('Payment process initiated for Bill No: ' + billNo);
  };

  return (
    <section
      id="pay-online"
      className="st-shape-wrap st-gray-bg"
      style={{ marginBottom: billDetails ? '50px' : '300px' }}
    >
      <div className="st-shape4">
        <img src="/shape/section_shape.png" alt="/shape/section_shape.png" />
      </div>
      <div className="st-shape6">
        <img src="/shape/contact-shape3.svg" alt="/shape/contact-shape3.svg" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Make Payment Online"
        subTitle="Enter your bill number to search for the bill details and proceed to make an online payment."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="st-payment-form" id="payment-form">
              <div className="row">
                <div className="col-lg-12">
                  <div className="st-form-field st-style1" style={{ textAlign: 'center' }}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Bill Number</label>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <input
                        type="text"
                        id="billNo"
                        name="billNo"
                        placeholder="Enter Bill Number"
                        onChange={handleInputChange}
                        value={billNo}
                        required
                        style={{ width: '200px', marginRight: '10px', padding: '8px' }}
                      />
                      <button
                        className="st-btn st-style1 st-color1 st-size-medium"
                        onClick={handleSearchBill}
                        style={{ whiteSpace: 'nowrap' }}
                        disabled={loading}
                      >
                        {loading ? 'Searching...' : 'Search Bill'}
                      </button>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="col-lg-12" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
                  </div>
                )}
                {billDetails && (
                  <div className="col-lg-12" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div
                      className="st-bill-details"
                      style={{
                        display: 'inline-block',
                        textAlign: 'left',
                        padding: '20px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      <h4 style={{ textAlign: 'center' }}>Bill Details</h4>
                      <p>
                        <strong>Bill Number:</strong> {billDetails.billNo}
                      </p>
                      <p>
                        <strong>Patient Name:</strong> {billDetails.patientName}
                      </p>
                      <p>
                        <strong>Billing Type:</strong> {billDetails.billingType}
                      </p>
                      <p>
                        <strong>Hospital Name:</strong> {billDetails.hospitalName}
                      </p>
                      <p>
                        <strong>Total Amount Due:</strong> {billDetails.totalAmount}
                      </p>
                      <p>
                        <strong>Payment Status:</strong> {billDetails.paymentStatus}
                      </p>
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {billDetails.paymentStatus === 'Pending' && (
                          <button
                            className="st-btn st-style1 st-color1 st-size-medium"
                            onClick={handlePayOnline}
                          >
                            Pay Online
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayOnline;

import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Button, Spinner, Card } from 'react-bootstrap';
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

  const handlePayOnline = async () => {
    if (!billDetails) {
      alert("No payment data available");
      return;
    }

    const paymentData = {
      first_name: billDetails.patientName.split(" ")[0],  // Split patient name for first name
      last_name: billDetails.patientName.split(" ")[1] || "",  // Split patient name for last name, if available
      email: billDetails.patientEmail,
      phone: billDetails.contactNumber,
      address: "Colombo, Sri Lanka",  // Hardcoded for your request
      city: "Colombo",
      country: "Sri Lanka",
      order_id: billDetails.billNo,
      items: billDetails.billNo,
      currency: "LKR",
      amount: billDetails.totalAmount.toFixed(2),  // Total amount formatted to two decimals
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/onlinepayment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const responseData = await response.text();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = responseData;
        const form = tempDiv.querySelector("form");
        document.body.appendChild(form);
        form.submit();  // Automatically submit the form to redirect to PayHere
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      alert("Error initiating payment. Please try again later.");
    }
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
                    <Card
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
                        <strong>Total Amount Due:</strong> Rs.{billDetails.totalAmount.toFixed(2)}
                      </p>
                      <p>
                        <strong>Payment Status:</strong> {billDetails.paymentStatus}
                      </p>
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {billDetails.paymentStatus === 'Pending' && (
                          <Button
                            className="st-btn st-style1 st-color1 st-size-medium"
                            onClick={handlePayOnline}
                          >
                            Pay Online
                          </Button>
                        )}
                      </div>
                    </Card>
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

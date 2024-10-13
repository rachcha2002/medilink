import React, { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../../Context/AuthContext';

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();

  // Fetch payment data from the API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/payment/billing/patient/${user.patientID}`)
      .then((response) => {
        setPaymentHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment history:', error);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  if (loading) {
    return <p>Loading payment history...</p>;
  }

  return (
    <section className="st-shape-wrap" id="payment-history" style={{marginBottom:'200px'}}>
      <div className="st-shape1">
        <img src="/shape/contact-shape1.svg" alt="shape1" />
      </div>
      <div className="st-shape2">
        <img src="/shape/contact-shape2.svg" alt="shape2" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Payment History"
        subTitle="Below is a list of all your past payments. Easily track your bills and statuses."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-table-wrapper">
              <table className="table st-payment-history-table">
                <thead>
                  <tr>
                    <th>Bill Number</th>
                    <th>Hospital Name</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment.billNo}</td>
                      <td>{payment.hospitalName}</td>
                      <td>{`Rs.${payment.totalAmount}`}</td>
                      <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status ${
                            payment.paymentStatus === 'Paid' ? 'paid' : 'pending'
                          }`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className="st-btn st-style1 st-color2 st-size-small st-btn-align"
                          onClick={() => handleShowModal(payment)}
                        >
                          <Icon
                            icon="mdi:eye"
                            style={{
                              verticalAlign: 'middle',
                              marginRight: '5px',
                              fontSize: '1.2em',
                            }}
                          />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />

      {/* Modal for payment details */}
      {selectedPayment && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Bill Number:</strong> {selectedPayment.billNo}</p>
            <p><strong>Hospital Name:</strong> {selectedPayment.hospitalName}</p>
            <p><strong>Hospital Address:</strong> {selectedPayment.hospitalAddress}</p>
            <p><strong>Total Amount:</strong> Rs.{selectedPayment.totalAmount}</p>
            <p><strong>Billing Type:</strong> {selectedPayment.billingType}</p>
            <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod}</p>
            <p><strong>Status:</strong> {selectedPayment.paymentStatus}</p>
            <p><strong>Date:</strong> {new Date(selectedPayment.createdAt).toLocaleString()}</p>
            <p><strong>Services:</strong></p>
            <ul>
              {selectedPayment.serviceDetails.map((service, index) => (
                <li key={index}>
                  {service.description}: Rs.{service.cost}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .st-payment-history-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .st-payment-history-table th,
        .st-payment-history-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .st-payment-history-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .st-payment-history-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .st-table-wrapper {
          overflow-x: auto;
        }

        .status.paid {
          color: #28a745;
          font-weight: bold;
        }

        .status.pending {
          color: #ffc107;
          font-weight: bold;
        }

        .st-btn.st-style1.st-color2 {
          background-color: #17a2b8;
          color: #fff;
          display: inline-flex;
          align-items: center;
        }

        .st-btn.st-style1.st-color2:hover {
          background-color: #138f99;
          color: #fff;
        }

        .st-btn.st-size-small {
          padding: 8px 12px;
          font-size: 0.875rem;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          .st-payment-history-table {
            font-size: 0.875rem;
          }

          .st-payment-history-table th,
          .st-payment-history-table td {
            padding: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default PaymentHistory;

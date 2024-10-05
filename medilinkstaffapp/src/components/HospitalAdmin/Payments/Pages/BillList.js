import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BillingList = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/payment/billing')
      .then(response => {
        setBillingData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the billing data!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-3">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Billing Information</h1>
        <Button variant="primary" onClick={() => navigate("/hospitaladmin/payment/createBill")}>
          Add Bill
        </Button>
      </div>
      <Table bordered hover responsive className="shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <thead className="bg-primary text-white">
          <tr>
            <th>Billing Type</th>
            <th>Patient Name</th>
            <th>Patient ID</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((billing, index) => (
            <tr key={index}>
              <td>{billing.billingType}</td>
              <td>{billing.patientName}</td>
              <td>{billing.patientID}</td>
              <td>{billing.contactNumber}</td>
              <td>{billing.patientEmail}</td>
              <td>${billing.totalAmount.toFixed(2)}</td>
              <td>{billing.paymentMethod}</td>
              <td>
                <Badge pill bg={billing.paymentStatus === 'Paid' ? 'success' : 'warning'}>
                  {billing.paymentStatus === 'Paid' ? <FaCheckCircle /> : <FaExclamationCircle />} {billing.paymentStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BillingList;

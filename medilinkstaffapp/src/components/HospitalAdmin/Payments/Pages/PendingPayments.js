import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  Badge,
  Button,
  Modal,
  Form,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FaCheckCircle, FaExclamationCircle, FaTimes, FaCheck } from "react-icons/fa";
import ".././../../Main/Main.css";

const PendingPayments = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/payment/billing/pending/pendingbills")
      .then((response) => {
        setPendingPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending payments!", error);
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

  const handleApprove = (paymentId) => {
    axios
      .put(`http://localhost:5000/api/payment/billing/${paymentId}`, {
        paymentStatus: "Paid",
      })
      .then(() => {
        setPendingPayments((prev) =>
          prev.map((payment) =>
            payment._id === paymentId
              ? { ...payment, paymentStatus: "Paid" }
              : payment
          )
        );
        alert("Payment approved successfully.");
      })
      .catch((error) => {
        console.error("Error approving payment:", error);
      });
  };

  const handleReject = (paymentId) => {
    axios
      .put(`http://localhost:5000/api/payment/billing/${paymentId}`, {
        paymentStatus: "Rejected",
      })
      .then(() => {
        setPendingPayments((prev) =>
          prev.map((payment) =>
            payment._id === paymentId
              ? { ...payment, paymentStatus: "Rejected" }
              : payment
          )
        );
        alert("Payment rejected successfully.");
      })
      .catch((error) => {
        console.error("Error rejecting payment:", error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayments = pendingPayments.filter(
    (payment) =>
      payment.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patientID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="text-center mt-3">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container
      className="mt-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h1>Pending Payments</h1>

      {/* Search bar for filtering by Bill No */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Bill No, Patient Name, or Patient ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      <Table
        bordered
        hover
        responsive
        className="shadow-sm"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <thead className="bg-primary text-white">
          <tr>
            <th>Bill No</th>
            <th>Billing Type</th>
            <th>Patient Name</th>
            <th>Patient ID</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index} onClick={() => handleShowModal(payment)}>
              <td>{payment.billNo}</td>
              <td>{payment.billingType}</td>
              <td>{payment.patientName}</td>
              <td>{payment.patientID}</td>
              <td>{payment.contactNumber}</td>
              <td>{payment.patientEmail}</td>
              <td>${payment.totalAmount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td>
                <Badge
                  pill
                  bg={
                    payment.paymentStatus === "Pending"
                      ? "warning"
                      : payment.paymentStatus === "Paid"
                      ? "success"
                      : "danger"
                  }
                >
                  {payment.paymentStatus === "Pending" ? (
                    <FaExclamationCircle />
                  ) : payment.paymentStatus === "Paid" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationCircle />
                  )}{" "}
                  {payment.paymentStatus}
                </Badge>
              </td>
              <td>
                <ButtonGroup>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(payment._id);
                    }}
                    disabled={payment.paymentStatus !== "Pending"}
                    title="Approve"
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(payment._id);
                    }}
                    disabled={payment.paymentStatus !== "Pending"}
                    title="Reject"
                  >
                    <FaTimes />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedPayment && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Bill No</Form.Label>
                    <Form.Control type="text" value={selectedPayment.billNo} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Billing Type</Form.Label>
                    <Form.Control type="text" value={selectedPayment.billingType} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control type="text" value={selectedPayment.patientName} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control type="text" value={selectedPayment.patientID} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control type="text" value={`$${selectedPayment.totalAmount}`} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" value={selectedPayment.contactNumber} readOnly />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={selectedPayment.patientEmail} readOnly />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control type="text" value={selectedPayment.paymentMethod} readOnly />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default PendingPayments;

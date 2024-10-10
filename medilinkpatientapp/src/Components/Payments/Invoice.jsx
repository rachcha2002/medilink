import React, { useRef } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { IMAGES } from "../../constants/images";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const invoiceRef = useRef();

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <Container fluid className="py-5" style={{ background: "#eef2f5" }}>
      <Container
        ref={invoiceRef}
        className="p-4 rounded shadow-lg"
        style={{ maxWidth: "800px", backgroundColor: "#ffffff" }}
      >
        {/* Header Section */}
        <Row className="align-items-center border-bottom pb-3 mb-4">
          <Col xs={12} md={8} className="text-start">
            <img
              src={IMAGES.medilinknobackground}
              alt="Logo"
              style={{ width: "150px" }}
            />
            <div className="mt-3">
              <h4 className="text-primary fw-bold mb-1">Medilink Hospital</h4>
              <p className="mb-0 text-muted small">
                2705 N. Enterprise, Orange, CA 89438
              </p>
              <p className="mb-0 text-muted small">Phone: +1 123-456-7890</p>
              <p className="text-muted small">
                Email: contact@medilinkhospital.com
              </p>
            </div>
          </Col>
          <Col xs={12} md={4} className="text-md-end text-start mt-3 mt-md-0">
            <h5 className="fw-bold text-uppercase">Hospital Bill</h5>
            <p className="text-muted mb-1 fw-bold">
              Bill No: <span className="text-dark">#16789</span>
            </p>
            <p className="text-muted fw-bold">
              Date: <span className="text-dark">05/12/2020</span>
            </p>
          </Col>
        </Row>

        {/* Patient Information */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <Row>
              <Col>
                <h6 className="fw-bold text-primary mb-3">
                  Patient Information
                </h6>
                <Row className="text-muted">
                  <Col xs={12} md={6}>
                    <p className="mb-1">
                      <span className="fw-bold text-dark">Name:</span> Smith
                      Rhodes
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold text-dark">Age:</span> 45
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold text-dark">Gender:</span> Male
                    </p>
                  </Col>
                  <Col xs={12} md={6}>
                    <p className="mb-1">
                      <span className="fw-bold text-dark">Patient ID:</span>{" "}
                      123456
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold text-dark">Address:</span> 15
                      Hodges Mews, High Wycombe, HP12 3JL, United Kingdom
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Services Table */}
        {/* Billing Summary */}
        {/* Billing Summary */}
        {/* Billing Summary */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body>
            <h6 className="fw-bold text-primary mb-3">Billing Summary</h6>
            <Table hover responsive className="m-0">
              <thead className="bg-light">
                <tr>
                  <th>Service</th>
                  <th className="text-end">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consultation Fee</td>
                  <td className="text-end">1500.00</td>
                </tr>
                <tr>
                  <td>Room Charges (2 days)</td>
                  <td className="text-end">10000.00</td>
                </tr>
                <tr>
                  <td>Medicines</td>
                  <td className="text-end">5000.00</td>
                </tr>
                <tr>
                  <td>Laboratory Tests</td>
                  <td className="text-end">2500.00</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Total Amount */}
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <Row className="justify-content-end">
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-between py-3">
                  <span className="fw-bold fs-4">Total:</span>
                  <span className="text-success fw-bold fs-4">
                    Rs. 20900.00
                  </span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Actions */}
        <div className="text-center mt-4">
          <p className="small text-muted mb-3">
            <strong>NOTE:</strong> This is a computer-generated bill and does
            not require a physical signature.
          </p>
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="success"
              className="me-3 px-4 py-2 shadow"
              onClick={printInvoice}
            >
              <i className="fas fa-print me-2"></i>Print
            </Button>
            <Button
              variant="outline-secondary"
              className="px-4 py-2 shadow"
              onClick={downloadInvoice}
            >
              <i className="fas fa-download me-2"></i>Download
            </Button>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default Invoice;

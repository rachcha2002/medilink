import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ReportList() {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);

  // Fetch reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/medicalinfo/reports/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReports();
  }, []);

  // Handle modal opening and set selected report data
  const handleShowModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h3 className="mt-4">Reports Table</h3>

      {error && <Alert variant="danger">Error fetching reports: {error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Test Name</th>
            <th>Date</th>
            <th>PDF Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reports) && reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report._id}>
                <td>{report.patientId}</td>
                <td>{report.patientName}</td>
                <td>{report.doctor}</td>
                <td>{report.testName}</td>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>
                  <a
                    href={report.resultPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(report)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No reports available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal to display full report details */}
      {selectedReport && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Report Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <strong>Patient ID:</strong> {selectedReport.patientId}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Patient Name:</strong> {selectedReport.patientName}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Doctor:</strong> {selectedReport.doctor}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Test Name:</strong> {selectedReport.testName}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Date:</strong>{" "}
                {new Date(selectedReport.date).toLocaleDateString()}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Hospital:</strong> {selectedReport.hospital}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Lab Name:</strong> {selectedReport.labName}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Lab Contact:</strong> {selectedReport.labContact}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Remarks:</strong> {selectedReport.remarks}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Laboratorist Name:</strong>{" "}
                {selectedReport.laboratoristName ||
                  selectedReport.radiologistName}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="warning"
              onClick={() => alert("Update functionality")}
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={() => alert("Delete functionality")}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ReportList;

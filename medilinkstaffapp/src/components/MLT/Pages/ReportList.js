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
import { useNavigate } from "react-router-dom";
import PageTitle from "../../Common/PageTitle";
import "./Main.css";

function ReportList({ apiUrl, title, toggleLoading }) {
  const [reports, setReports] = useState([]); // State to hold combined lab and radiology reports
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch reports from the passed API endpoint
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Combine the labReports and radiologyReports into one array, if applicable
        const combinedReports = [...data.labReports, ...data.radiologyReports];
        setReports(combinedReports);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReports();
  }, [apiUrl]);

  // Handle modal opening and set selected report data
  const handleShowModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async (id, type) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/medicalinfo/reports/${type}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete report with ID ${id}`);
      }

      // Optionally, remove the report from the local state after successful deletion
      setReports(reports.filter((report) => report._id !== id));
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container
      className="p-4"
      style={{ background: "rgba(255, 255, 255, 0.4)", borderRadius: "10px" }}
    >
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
                  <a href={report.resultPdf} target="_blank" rel="noreferrer">
                    Result Report
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
            <Row className="mt-1">
              <Col>
                <strong>Patient ID:</strong> {selectedReport.patientId}
              </Col>
              <Col>
                <strong>Patient Name:</strong> {selectedReport.patientName}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Patient Age:</strong> {selectedReport.age}
              </Col>
              <Col>
                <strong>Patient Contact:</strong>{" "}
                {selectedReport.patientContact}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Doctor:</strong> {selectedReport.doctor}
              </Col>
              <Col>
                <strong>Hospital:</strong> {selectedReport.hospital}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Report Type:</strong> {selectedReport.reportType}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Test Name:</strong> {selectedReport.testName}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Date:</strong>{" "}
                {new Date(selectedReport.date).toLocaleDateString()}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Lab Name:</strong> {selectedReport.labName}
              </Col>
              <Col>
                <strong>Lab Contact:</strong> {selectedReport.labContact}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Result Report:</strong>{" "}
                <a
                  href={selectedReport.resultPdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download PDF
                </a>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Remarks:</strong> {selectedReport.remarks}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>
                  {selectedReport.reportType === "laboratory"
                    ? "Laboratorist ID:"
                    : "Radiologist ID:"}
                </strong>{" "}
                {selectedReport.laboratoristId || selectedReport.radiologistId}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>
                  {selectedReport.reportType === "laboratory"
                    ? "Laboratorist Name:"
                    : "Radiologist Name:"}
                </strong>{" "}
                {selectedReport.laboratoristName ||
                  selectedReport.radiologistName}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() =>
                navigate(
                  `/mltstaff/reportupdate/${selectedReport.reportType}/${selectedReport._id}`
                )
              } // Navigates to the update form
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                handleDelete(selectedReport._id, selectedReport.reportType)
              }
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

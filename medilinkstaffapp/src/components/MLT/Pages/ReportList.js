import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Alert,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../Main/Main.css";
import { FaFilePdf } from "react-icons/fa";

function ReportList({ apiUrl, title, toggleLoading }) {
  const [reports, setReports] = useState([]); // State to hold combined lab and radiology reports
  const [filteredReports, setFilteredReports] = useState([]); // State for filtered reports
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchDate, setSearchDate] = useState(""); // State for date selector
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
        let combinedReports = [];
        if (title === "All Reports") {
          combinedReports = [...data.labReports, ...data.radiologyReports];
        } else if (title === "Radiology Reports") {
          combinedReports = data.radiologyReports;
        } else if (title === "Laboratory Reports") {
          combinedReports = data.labReports;
        }
        setReports(combinedReports);
        setFilteredReports(combinedReports); // Set filtered reports initially
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReports();
  }, [apiUrl]);

  // Handle search query changes and filter reports
  useEffect(() => {
    const filtered = reports.filter((report) => {
      const isTextMatch = [
        report.patientId,
        report.patientName,
        report.doctor,
        report.testName,
      ].some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      const isDateMatch = searchDate
        ? new Date(report.date).toLocaleDateString() ===
          new Date(searchDate).toLocaleDateString()
        : true;
      return isTextMatch && isDateMatch;
    });
    setFilteredReports(filtered);
  }, [searchQuery, searchDate, reports]);

  // Handle modal opening and set selected report data
  const handleShowModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle reset search functionality
  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchDate("");
    setFilteredReports(reports); // Reset the filtered reports to the full list
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
      setFilteredReports(filteredReports.filter((report) => report._id !== id));
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container
      className="p-2"
      style={{ background: "rgba(255, 255, 255, 0.4)", borderRadius: "10px" }}
    >
      <h3 className="mt-1">Reports Table</h3>

      {error && <Alert variant="danger">Error fetching reports: {error}</Alert>}

      {/* Search input */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="searchText">
            <Form.Control
              type="text"
              placeholder="Search by Patient ID, Name, Doctor, or Test Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="searchDate">
            <Form.Control
              type="date"
              placeholder="Search by Date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button variant="secondary" onClick={handleResetSearch}>
            Reset Search
          </Button>
        </Col>
      </Row>

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
          {Array.isArray(filteredReports) && filteredReports.length > 0 ? (
            filteredReports.map((report) => (
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
                <Button
                  variant="link"
                  style={{ textDecoration: "none", paddingLeft: 0 }}
                  onClick={() =>
                    window.open(selectedReport.resultPdf, "_blank")
                  }
                >
                  <FaFilePdf style={{ marginRight: 5 }} />
                  Open Report
                </Button>
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

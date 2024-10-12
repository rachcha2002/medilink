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
import { FaFilePdf } from "react-icons/fa";

function MedicalRecords({ apiUrl, title }) {
  const [records, setRecords] = useState([]); // State to hold medical records
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search text
  const [searchDate, setSearchDate] = useState(""); // State for date picker
  const [filteredRecords, setFilteredRecords] = useState([]); // State for filtered records
  const navigate = useNavigate();

  // Fetch medical records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(apiUrl); // Fetch using the provided apiUrl prop
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data);
        setFilteredRecords(data); // Set filtered records initially
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecords();
  }, [apiUrl]); // Dependency array includes apiUrl to refetch if it changes

  // Handle search query changes and filter records
  useEffect(() => {
    const filtered = records.filter((record) => {
      const isTextMatch =
        record.patientId
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

      const isDateMatch = searchDate
        ? new Date(record.date).toLocaleDateString() ===
          new Date(searchDate).toLocaleDateString()
        : true;

      return isTextMatch && isDateMatch;
    });
    setFilteredRecords(filtered);
  }, [searchQuery, searchDate, records]);

  // Handle modal opening and set selected record data
  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle reset of the search and filters
  const handleResetSearch = () => {
    setSearchQuery("");
    setSearchDate("");
    setFilteredRecords(records); // Reset filtered records to the full list
  };

  // Handle record deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/${id}`, // Use the apiUrl for deletion as well
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete record with ID ${id}`);
      }

      // Optionally, remove the record from the local state after successful deletion
      setRecords(records.filter((record) => record._id !== id));
      setFilteredRecords(filteredRecords.filter((record) => record._id !== id)); // Remove from filtered results
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container
      className="p-1"
      style={{ background: "rgba(255, 255, 255, 0.4)", borderRadius: "10px" }}
    >
      {error && <Alert variant="danger">Error fetching records: {error}</Alert>}

      {/* Search Input and Date Picker */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Patient ID, Name, Doctor, or Diagnosis"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
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
            <th>Doctor Name</th>
            <th>Diagnosis</th>
            <th>Date</th>
            <th>PDF Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredRecords) && filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.patientId}</td>
                <td>{record.patientName}</td>
                <td>{record.doctorName}</td>
                <td>{record.diagnosis}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <a
                    href={record.medicalDocument.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Medical Record
                  </a>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(record)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No records available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal to display full record details */}
      {selectedRecord && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Medical Record Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-1">
              <Col>
                <strong>Patient ID:</strong> {selectedRecord.patientId}
              </Col>
              <Col>
                <strong>Patient Name:</strong> {selectedRecord.patientName}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Patient Age:</strong> {selectedRecord.patientAge}
              </Col>
              <Col>
                <strong>Gender:</strong> {selectedRecord.gender}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Doctor Name:</strong> {selectedRecord.doctorName}
              </Col>
              <Col>
                <strong>Hospital:</strong> {selectedRecord.hospital}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Diagnosis:</strong> {selectedRecord.diagnosis}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Symptoms:</strong>
                {selectedRecord.symptoms}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Date:</strong>{" "}
                {new Date(selectedRecord.date).toLocaleDateString()}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Remarks:</strong> {selectedRecord.remarks}
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Medical Document:</strong>{" "}
                <Button
                  variant="link"
                  style={{ textDecoration: "none", paddingLeft: 0 }}
                  onClick={() =>
                    window.open(
                      selectedRecord.medicalDocument.fileUrl,
                      "_blank"
                    )
                  }
                >
                  <FaFilePdf style={{ marginRight: 5 }} />
                  Open Record Document
                </Button>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <strong>Created By:</strong> {selectedRecord.createdByPosition}
                {" - "} {selectedRecord.createdBy}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() =>
                navigate(
                  `/medicalstaff/updatemedicalrecords/${selectedRecord._id}`
                )
              } // Navigates to the update form
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedRecord._id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default MedicalRecords;

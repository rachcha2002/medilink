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

function MedicalRecords({ apiUrl, title }) {
  const [records, setRecords] = useState([]); // State to hold medical records
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [error, setError] = useState(null);
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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecords();
  }, [apiUrl]); // Dependency array includes apiUrl to refetch if it changes

  // Handle modal opening and set selected record data
  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
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
      <h3 className="mt-4">{title} Table</h3>

      {error && <Alert variant="danger">Error fetching records: {error}</Alert>}

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
          {Array.isArray(records) && records.length > 0 ? (
            records.map((record) => (
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
                <a
                  href={selectedRecord.medicalDocument.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="color-blue"
                >
                  Download PDF
                </a>
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

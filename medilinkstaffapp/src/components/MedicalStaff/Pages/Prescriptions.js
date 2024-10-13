import React, { useState, useEffect } from "react";
import {
  Table,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have an AuthContext

function Prescriptions({ apiUrl, title }) {
  const { user } = useAuthContext(); // Fetch user from context
  const [isUserLoading, setIsUserLoading] = useState(true); // Track if user is loaded
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]); // State for filtered prescriptions
  const [selectedPrescription, setSelectedPrescription] = useState(null); // For holding the selected prescription
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search text
  const [searchDate, setSearchDate] = useState(""); // State for date picker
  const navigate = useNavigate();

  // Wait for user to load before fetching prescriptions
  useEffect(() => {
    if (user) {
      setIsUserLoading(false); // Mark user as loaded
    }
  }, [user]);

  // Fetch prescriptions from the provided apiUrl
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(apiUrl); // Use the apiUrl prop
        setPrescriptions(response.data); // Set the fetched prescriptions
        setFilteredPrescriptions(response.data); // Set initial filtered prescriptions
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError("Failed to fetch prescriptions. Please try again."); // Set error if the request fails
        setLoading(false); // Stop loading
      }
    };

    if (!isUserLoading) {
      fetchPrescriptions(); // Fetch only after user is loaded
    }
  }, [apiUrl, isUserLoading]); // Refetch data when apiUrl changes or user is loaded

  // Handle modal open and close
  const handleShowModal = (prescription) => {
    setSelectedPrescription(prescription); // Set the selected prescription
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  // Handle update and delete actions
  const handleUpdate = (id) => {
    navigate(`/medicalstaff/updateprescription/${id}`); // Navigate to the update page for the selected prescription
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend to delete the prescription by its ID
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/${id}`
      ); // Use the same apiUrl for deletion

      // Update the state to remove the deleted prescription
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription._id !== id)
      );
      setFilteredPrescriptions((prevFiltered) =>
        prevFiltered.filter((prescription) => prescription._id !== id)
      );

      // Close the modal after deletion
      setShowModal(false);
      alert("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete the prescription. Please try again.");
    }
  };

  // Filter prescriptions based on search query and date
  useEffect(() => {
    const filtered = prescriptions.filter((prescription) => {
      const isTextMatch =
        prescription.patientId
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        prescription.patientName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        prescription.doctorName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        prescription.doctorId.toLowerCase().includes(searchQuery.toLowerCase());

      const isDateMatch = searchDate
        ? new Date(prescription.date).toLocaleDateString() ===
          new Date(searchDate).toLocaleDateString()
        : true;

      return isTextMatch && isDateMatch;
    });
    setFilteredPrescriptions(filtered);
  }, [searchQuery, searchDate, prescriptions]);

  // Handle reset of search filters
  const handleResetSearch = () => {
    setSearchQuery(""); // Reset search query
    setSearchDate(""); // Reset search date
    setFilteredPrescriptions(prescriptions); // Reset filtered prescriptions to the original list
  };

  // Render loading state
  if (loading || isUserLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // Render error state
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Render table if prescriptions are available
  return (
    <div>
      <h5>Prescription Table</h5>
      <hr />

      {/* Search Input and Date Picker */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Patient ID, Name, Doctor, or Doctor ID"
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
        <Col md={3}>
          <Button variant="secondary" onClick={handleResetSearch}>
            Reset Search
          </Button>
        </Col>
      </Row>

      {filteredPrescriptions.length > 0 ? (
        <Table
          hover
          responsive
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "15px", // Rounded corners for the entire table
            overflow: "hidden", // Ensures content stays within rounded edges
            borderCollapse: "separate", // Allow border-radius to apply to the table
            borderSpacing: "0",
          }}
        >
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.patientId}</td>
                <td>{prescription.patientName}</td>
                <td>{prescription.doctorName}</td>
                <td>{new Date(prescription.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(prescription)}
                  >
                    More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No prescriptions found for this query.</Alert>
      )}

      {/* Modal to show prescription details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPrescription && (
            <div>
              <p>
                <strong>Patient ID:</strong> {selectedPrescription.patientId}
              </p>
              <p>
                <strong>Patient Name:</strong>{" "}
                {selectedPrescription.patientName}
              </p>
              <p>
                <strong>Patient Age:</strong> {selectedPrescription.patientAge}
              </p>
              <p>
                <strong>Doctor ID:</strong> {selectedPrescription.doctorId}
              </p>
              <p>
                <strong>Doctor Name:</strong> {selectedPrescription.doctorName}
              </p>
              <p>
                <strong>Doctor Email:</strong>{" "}
                {selectedPrescription.doctorEmail}
              </p>
              <p>
                <strong>Hospital:</strong> {selectedPrescription.hospital}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedPrescription.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Remarks:</strong> {selectedPrescription.remarks}
              </p>
              <strong>Medications:</strong>
              <ul>
                {selectedPrescription.medications.map((med, index) => (
                  <li key={index}>
                    {med.drugName} - {med.dosage} - {med.frequency} -{" "}
                    {med.duration}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {user?.doctorId === selectedPrescription?.doctorId && (
            <>
              <Button
                variant="warning"
                onClick={() => handleUpdate(selectedPrescription._id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedPrescription._id)}
              >
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Prescriptions;

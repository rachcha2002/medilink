import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../../Main/Main.css";

import PageTitle from "../../Main/PageTitle";
import { useNavigate } from "react-router-dom";

const hardCodedHospital = "Medihelp"; // Hardcoded hospital name

function PrescriptionsByHospital() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // For holding the selected prescription
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const navigate = useNavigate();

  // Fetch prescriptions by hospital
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Fetch prescriptions by hardcoded hospital
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/hospital/${hardCodedHospital}`
        );
        setPrescriptions(response.data); // Set the fetched prescriptions
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError("Failed to fetch prescriptions. Please try again."); // Set error if the request fails
        setLoading(false); // Stop loading
      }
    };

    fetchPrescriptions();
  }, []);

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
      );

      // Update the state to remove the deleted prescription
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription._id !== id)
      );

      // Close the modal after deletion
      setShowModal(false);
      alert("Prescription deleted successfully!");
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Failed to delete the prescription. Please try again.");
    }
  };

  // Render loading state
  if (loading) {
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
    <main id="main" className="main">
      <PageTitle />
      <div>
        <h2>Prescriptions for {hardCodedHospital}</h2>
        {prescriptions.length > 0 ? (
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
              {prescriptions.map((prescription) => (
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
          <Alert variant="info">
            No prescriptions found for {hardCodedHospital}
          </Alert>
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
                  <strong>Patient Age:</strong>{" "}
                  {selectedPrescription.patientAge}
                </p>
                <p>
                  <strong>Doctor ID:</strong> {selectedPrescription.doctorId}
                </p>
                <p>
                  <strong>Doctor Name:</strong>{" "}
                  {selectedPrescription.doctorName}
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
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
}

export default PrescriptionsByHospital;

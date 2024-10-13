import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";

const PrescriptionList = () => {
  const { user } = useAuthContext(); // Use context to get the patient ID
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null); // To show details in a modal
  const [showModal, setShowModal] = useState(false);

  // Fetch prescriptions for the specific patient
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        console.log("Fetching prescriptions for patient ID: ", user.patientID);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/patient/${user.patientID}`
        );
        setPrescriptions(response.data);
        setLoading(false);
      } catch (error) {
        // Check if it's a 404 error
        if (error.response && error.response.status === 404) {
          setError("No records found."); // Set the error to "No records found"
        } else {
          setError("Failed to fetch prescriptions. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [user.patientID]);

  // Show the modal with prescription details
  const handleShowModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
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

  return (
    <section className="st-shape-wrap" id="prescription-list">
      <div className="st-shape1">
        <img src="/shape/contact-shape1.svg" alt="shape1" />
      </div>
      <div className="st-shape2">
        <img src="/shape/contact-shape2.svg" alt="shape2" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Prescription List"
        subTitle="Below is a list of all your prescriptions. You can view the details of each one."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-table-wrapper">
              {prescriptions.length > 0 ? (
                <Table hover responsive className="st-prescription-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor Name</th>
                      <th>Hospital</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription) => (
                      <tr key={prescription._id}>
                        <td>
                          {new Date(prescription.date).toLocaleDateString()}
                        </td>
                        <td>{prescription.doctorName}</td>
                        <td>{prescription.hospital}</td>
                        <td>
                          <button
                            className="st-btn st-style1 st-color2 st-size-small st-btn-align"
                            onClick={() => handleShowModal(prescription)}
                          >
                            <Icon
                              icon="mdi:eye"
                              style={{
                                verticalAlign: "middle",
                                marginRight: "5px",
                                fontSize: "1.2em",
                              }}
                            />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">
                  No prescriptions found for this patient.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />

      {/* Modal for prescription details */}
      {selectedPrescription && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Prescription Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedPrescription.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Doctor Name:</strong> {selectedPrescription.doctorName}
            </p>
            <p>
              <strong>Hospital:</strong> {selectedPrescription.hospital}
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .st-prescription-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .st-prescription-table th,
        .st-prescription-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .st-prescription-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .st-prescription-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .st-btn.st-style1.st-color2 {
          background-color: #17a2b8;
          color: #fff;
          display: inline-flex;
          align-items: center;
        }

        .st-btn.st-style1.st-color2:hover {
          background-color: #138f99;
          color: #fff;
        }

        .st-btn.st-size-small {
          padding: 8px 12px;
          font-size: 0.875rem;
          margin-top: 5px;
        }
      `}</style>
    </section>
  );
};

export default PrescriptionList;

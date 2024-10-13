import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";
import { FaFilePdf } from "react-icons/fa"; // To display PDF link icon

const MedicalRecordsList = () => {
  const { user } = useAuthContext(); // Use context to get the patient ID
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); // For the modal
  const [showModal, setShowModal] = useState(false);

  // Fetch medical records for the specific patient
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/patient/${user.patientID}`
        );
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("No medical records found.");
        } else {
          setError("Failed to fetch medical records. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchRecords();
  }, [user.patientID]);

  // Show the modal with medical record details
  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
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
    <section className="st-shape-wrap" id="medical-records-list">
      <div className="st-shape1">
        <img src="/shape/contact-shape1.svg" alt="shape1" />
      </div>
      <div className="st-shape2">
        <img src="/shape/contact-shape2.svg" alt="shape2" />
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Medical Records"
        subTitle="Below is a list of all your medical records. You can view the details of each one."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-table-wrapper">
              {records.length > 0 ? (
                <Table hover responsive className="st-medical-records-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Doctor Name</th>
                      <th>Hospital</th>
                      <th>Diagnosis</th>
                      <th>Document</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record._id}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.doctorName}</td>
                        <td>{record.hospital}</td>
                        <td>{record.diagnosis}</td>
                        <td>
                          <a
                            href={record.medicalDocument.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaFilePdf style={{ marginRight: "5px" }} />
                            View PDF
                          </a>
                        </td>
                        <td>
                          <button
                            className="st-btn st-style1 st-color2 st-size-small st-btn-align"
                            onClick={() => handleShowModal(record)}
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
                  No medical records found for this patient.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />

      {/* Modal for medical record details */}
      {selectedRecord && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Medical Record Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedRecord.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Doctor Name:</strong> {selectedRecord.doctorName}
            </p>
            <p>
              <strong>Hospital:</strong> {selectedRecord.hospital}
            </p>
            <p>
              <strong>Diagnosis:</strong> {selectedRecord.diagnosis}
            </p>
            <p>
              <strong>Symptoms:</strong> {selectedRecord.symptoms}
            </p>
            <p>
              <strong>Remarks:</strong> {selectedRecord.remarks}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .st-medical-records-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .st-medical-records-table th,
        .st-medical-records-table td {
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .st-medical-records-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .st-medical-records-table tr:nth-child(even) {
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

export default MedicalRecordsList;

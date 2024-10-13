import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Table,
  Alert,
  Container,
  Modal,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { FaFilePdf } from "react-icons/fa";

function PatientDetailsForm() {
  const [patientId, setPatientId] = useState("");
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [radiologyReports, setRadiologyReports] = useState([]);
  const [laboratoryReports, setLaboratoryReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal states
  const [selectedPrescription, setSelectedPrescription] = useState(null); // To show details in a modal
  const [showModal, setShowModal] = useState(false);

  // Fetch patient details and other reports
  const fetchPatientDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch patient info
      const patientResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/patients/getbyid/${patientId}`
      );
      const patientData = await patientResponse.json();
      setPatientInfo(patientData);

      // Fetch medical records
      const medicalRecordsResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/patient/${patientId}`
      );
      const medicalRecordsData = await medicalRecordsResponse.json();
      setMedicalRecords(medicalRecordsData);

      // Fetch prescriptions
      const prescriptionsResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/patient/${patientId}`
      );
      const prescriptionsData = await prescriptionsResponse.json();
      setPrescriptions(prescriptionsData);

      // Fetch radiology reports
      const radiologyResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/patients/${patientId}`
      );
      const radiologyData = await radiologyResponse.json();
      setRadiologyReports(radiologyData.radiologyReports);

      // Fetch laboratory reports
      const laboratoryResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/patients/${patientId}`
      );
      const laboratoryData = await laboratoryResponse.json();
      setLaboratoryReports(laboratoryData.labReports);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch patient details. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPatientDetails();
  };

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

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth); // Convert dateOfBirth to a Date object
    const today = new Date(); // Current date
    let age = today.getFullYear() - birthDate.getFullYear(); // Difference in years
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month and day haven't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <Container className="mt-5">
      <h2>Patient Details Checker</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formPatientId">
              <Form.Label>Enter Patient ID</Form.Label>
              <Form.Control
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter patient number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Fetch Details
        </Button>
      </Form>

      {loading && (
        <Spinner animation="border" role="status" className="mt-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Patient Info Section */}
      {patientInfo && (
        <div className="mt-5">
          <h3>Patient Information</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th>Patient Name</th>
                <td>{patientInfo.name}</td>
              </tr>
              <tr>
                <th>Patient ID</th>
                <td>{patientId}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td>{patientInfo.phone}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{patientInfo.address}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{calculateAge(patientInfo.dateOfBirth)}</td>
              </tr>
              <tr>
                <th>Medical History</th>
                <td>{patientInfo.medicalHistory}</td>
              </tr>
              <tr>
                <th>Current Diagnoses</th>
                <td>{patientInfo.currentDiagnoses}</td>
              </tr>
              <tr>
                <th>Current Medications</th>
                <td>{patientInfo.currentMedications}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}

      <h3>Medical Records</h3>

      {/* Medical Records Section */}
      {medicalRecords.length > 0 ? (
        <Table hover responsive className="st-medical-records-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Hospital</th>
              <th>Diagnosis</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
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
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No medical records found for this patient.</Alert>
      )}

      <h3>Prescriptions</h3>
      {/* Prescriptions Section */}
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
                <td>{new Date(prescription.date).toLocaleDateString()}</td>
                <td>{prescription.doctorName}</td>
                <td>{prescription.hospital}</td>
                <td>
                  <button
                    className="st-btn st-style1 st-color2 st-size-small st-btn-align"
                    onClick={() => handleShowModal(prescription)}
                    style={{
                      border: "none", // Removes the border
                      outline: "none", // Ensures there's no outline
                      backgroundColor: "transparent", // Optional: removes background color
                      cursor: "pointer", // Optional: changes the cursor to a pointer
                    }}
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
        <Alert variant="info">No prescriptions found for this patient.</Alert>
      )}

      <h3>Radiology Reports</h3>
      {/* Radiology Reports Section */}
      {radiologyReports.length > 0 ? (
        <Table hover responsive className="st-reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Hospital</th>
              <th>Test Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {radiologyReports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.doctor}</td>
                <td>{report.hospital}</td>
                <td>{report.testName}</td>
                <td>
                  <a href={report.resultPdf} target="_blank" rel="noreferrer">
                    <FaFilePdf style={{ marginRight: "5px" }} />
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          No Radiology reports found for this patient.
        </Alert>
      )}

      <h3>Laboratory Reports</h3>
      {/* Laboratory Reports Section */}
      {laboratoryReports.length > 0 ? (
        <Table hover responsive className="st-reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Hospital</th>
              <th>Test Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {laboratoryReports.map((report) => (
              <tr key={report._id}>
                <td>{new Date(report.date).toLocaleDateString()}</td>
                <td>{report.doctor}</td>
                <td>{report.hospital}</td>
                <td>{report.testName}</td>
                <td>
                  <a href={report.resultPdf} target="_blank" rel="noreferrer">
                    <FaFilePdf style={{ marginRight: "5px" }} />
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          No Radiology reports found for this patient.
        </Alert>
      )}

      {/* Modal for medical record details */}
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
    </Container>
  );
}

export default PatientDetailsForm;

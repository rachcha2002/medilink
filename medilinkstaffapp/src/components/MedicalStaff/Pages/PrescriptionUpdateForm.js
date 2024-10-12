import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function PrescriptionUpdateForm() {
  const { id } = useParams();
  const prescriptionId = id;
  const [prescription, setPrescription] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    doctorId: "",
    doctorName: "",
    doctorEmail: "",
    hospital: "",
    medications: [{ drugName: "", dosage: "", frequency: "", duration: "" }],
    remarks: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch prescription by its ID when the component mounts
    const fetchPrescriptionDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/${prescriptionId}`
        );
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription details:", error);
      }
    };

    fetchPrescriptionDetails();
  }, [prescriptionId]);

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications[index][field] = value;
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  const addMedication = () => {
    setPrescription((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { drugName: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  const removeMedication = (index) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications.splice(index, 1);
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    try {
      // Make a PUT request to the backend to update the prescription
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions/${prescriptionId}`,
        prescription
      );

      alert("Prescription updated successfully!");
      navigate(-1); // Redirect to the prescriptions page
    } catch (error) {
      console.error("Error updating prescription:", error);
      alert("Failed to update prescription. Please try again.");
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Update Prescription" url="/mltstaff" />
      <Row className="align-items-center">
        <Col xs="auto">
          <Button
            variant="dark"
            onClick={() => navigate(-1)}
            style={{ margin: "10px" }}
          >
            <BsArrowLeft /> Back
          </Button>
        </Col>
        <Col>
          <h3>Update Prescriptions</h3>
        </Col>
      </Row>
      <hr />

      <Form onSubmit={handleUpdate}>
        <h5 className="mt-2">Patient Details</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPatientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="text"
                value={prescription.patientId}
                readOnly
                disabled // Disable patient ID
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPatientName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                value={prescription.patientName}
                readOnly
                disabled // Disable patient name
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPatientAge">
              <Form.Label>Patient Age</Form.Label>
              <Form.Control
                type="text"
                value={prescription.patientAge}
                readOnly
                disabled // Disable patient age
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-2">Doctor Details</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDoctorName">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                value={prescription.doctorName}
                readOnly
                disabled // Disable doctor name
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDoctorEmail">
              <Form.Label>Doctor Email</Form.Label>
              <Form.Control
                type="email"
                value={prescription.doctorEmail}
                readOnly
                disabled // Disable doctor email
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formHospital">
              <Form.Label>Hospital</Form.Label>
              <Form.Control
                type="text"
                value={prescription.hospital}
                readOnly
                disabled // Disable hospital
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-2">Medications</h5>
        {prescription.medications.map((medication, index) => (
          <Row key={index}>
            <Col md={3}>
              <Form.Group controlId={`formDrugName${index}`}>
                <Form.Label>Drug Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter drug name"
                  value={medication.drugName}
                  onChange={(e) =>
                    handleMedicationChange(index, "drugName", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId={`formDosage${index}`}>
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter dosage"
                  value={medication.dosage}
                  onChange={(e) =>
                    handleMedicationChange(index, "dosage", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId={`formFrequency${index}`}>
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Frequency"
                  value={medication.frequency}
                  onChange={(e) =>
                    handleMedicationChange(index, "frequency", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId={`formDuration${index}`}>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Duration"
                  value={medication.duration}
                  onChange={(e) =>
                    handleMedicationChange(index, "duration", e.target.value)
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => removeMedication(index)}
                  className="me-2"
                >
                  Remove
                </Button>
              )}
            </Col>
          </Row>
        ))}

        <Button variant="secondary" onClick={addMedication} className="mt-2">
          Add More Medications
        </Button>

        <Form.Group controlId="formRemarks" className="mt-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={prescription.remarks}
            onChange={(e) =>
              setPrescription({ ...prescription, remarks: e.target.value })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Prescription
        </Button>
      </Form>
    </main>
  );
}

export default PrescriptionUpdateForm;

import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios"; // For making API requests
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

const hardCodedDoctorId = "D0000001"; // Hardcoded doctor ID

function PrescriptionForm() {
  const [prescription, setPrescription] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    doctorId: hardCodedDoctorId,
    doctorName: "",
    doctorEmail: "",
    hospital: "",
    medications: [{ drugName: "", dosage: "", frequency: "", duration: "" }],
    remarks: "",
  });

  // Dummy patient data
  const dummyPatient = {
    patientId: "P123456",
    patientName: "John Doe",
    patientAge: "35",
  };

  // Fetch doctor details from backend using the hardcoded doctorId
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors/${hardCodedDoctorId}`
        );
        const doctorData = response.data;
        setPrescription((prev) => ({
          ...prev,
          doctorName: doctorData.name,
          doctorEmail: doctorData.email,
          hospital: doctorData.hospital,
        }));
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handlePatientIdChange = (e) => {
    const patientId = e.target.value;
    setPrescription((prev) => ({
      ...prev,
      patientId: patientId,
      // Simulate fetching patient details based on patientId
      patientName: dummyPatient.patientName,
      patientAge: dummyPatient.patientAge,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    try {
      // Make a POST request to the backend to save the prescription
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions`, // Backend URL to handle prescription submission
        prescription // The prescription data from the state
      );

      // Handle successful response
      console.log("Prescription successfully submitted:", response.data);
      alert("Prescription submitted successfully!");

      // Optionally, reset the form fields after successful submission
      setPrescription({
        patientId: "",
        patientName: "",
        patientAge: "",
        doctorId: hardCodedDoctorId,
        doctorName: prescription.doctorName,
        doctorEmail: prescription.doctorEmail,
        hospital: prescription.hospital,
        medications: [
          { drugName: "", dosage: "", frequency: "", duration: "" },
        ],
        remarks: "",
      });
    } catch (error) {
      // Handle error response
      console.error("Error submitting prescription:", error.response);
      alert("Failed to submit prescription. Please try again.");
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle />
      <Form onSubmit={handleSubmit}>
        <h5 className="mt-2">Patient Details</h5>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPatientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient ID"
                value={prescription.patientId}
                onChange={handlePatientIdChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPatientName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient Name"
                value={prescription.patientName}
                readOnly
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPatientAge">
              <Form.Label>Patient Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Patient Age"
                value={prescription.patientAge}
                readOnly
                required
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
                required
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
                required
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
                required
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
          Submit Prescription
        </Button>
      </Form>
    </main>
  );
}

export default PrescriptionForm;

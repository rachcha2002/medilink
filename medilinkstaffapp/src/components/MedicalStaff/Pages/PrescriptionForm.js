import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import axios from "axios"; // For making API requests
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from ".././../../context/AuthContext"; // Assuming you're using AuthContext for user info

function PrescriptionForm() {
  const { user, usertype } = useAuthContext(); // Assuming user object is provided by AuthContext
  const navigate = useNavigate();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to ensure data is fetched
  const [prescription, setPrescription] = useState({
    patientId: "",
    patientName: "",
    patientAge: "", // Age will be derived from dateOfBirth
    doctorId: "",
    doctorName: "",
    doctorEmail: "",
    hospital: "",
    medications: [{ drugName: "", dosage: "", frequency: "", duration: "" }],
    remarks: "",
  });
  const [errorMessage, setErrorMessage] = useState(null); // For error messages

  // Fetch doctor details based on user.doctorId
  useEffect(() => {
    // Wait until user object is available
    if (user && user.doctorId) {
      const fetchDoctorDetails = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors/${user.doctorId}`
          );
          const doctorData = response.data;
          setPrescription((prev) => ({
            ...prev,
            doctorId: user.doctorId,
            doctorName: doctorData.name,
            doctorEmail: doctorData.email,
            hospital: doctorData.hospital,
          }));
          setLoading(false); // Stop loading once data is fetched
        } catch (error) {
          console.error("Error fetching doctor details:", error);
          setLoading(false); // Stop loading even if there is an error
        }
      };

      fetchDoctorDetails();
    } else if (user && !user.doctorId) {
      // If user is not a doctor, display an alert and redirect back
      setErrorMessage("Only doctors can add prescriptions.");
      setIsFormDisabled(true); // Disable the form
      setLoading(false); // Stop loading
    }
  }, [user, usertype, navigate]);

  // Function to calculate age from dateOfBirth
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Handle changes in patient ID and fetch patient details
  const handlePatientIdChange = async (e) => {
    const patientId = e.target.value;
    setPrescription((prev) => ({
      ...prev,
      patientId: patientId,
    }));

    if (patientId) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/patients/getbyid/${patientId}`
        );
        const patientData = response.data;
        // Calculate the age from dateOfBirth
        const age = calculateAge(patientData.dateOfBirth);
        setPrescription((prev) => ({
          ...prev,
          patientName: patientData.name,
          patientAge: age, // Set the calculated age
        }));
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setErrorMessage("Patient not found.");
      }
    }
  };

  // Handle medication change
  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications[index][field] = value;
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  // Add more medication fields
  const addMedication = () => {
    setPrescription((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        { drugName: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  // Remove medication field
  const removeMedication = (index) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications.splice(index, 1);
    setPrescription({ ...prescription, medications: updatedMedications });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make a POST request to the backend to save the prescription
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/prescriptions`,
        prescription
      );

      // Handle successful response
      alert("Prescription submitted successfully!");
      navigate("/medicalstaff/prescriptions"); // Redirect to the prescriptions page

      // Reset form fields
      setPrescription({
        patientId: "",
        patientName: "",
        patientAge: "",
        doctorId: user?.doctorId || "",
        doctorName: "",
        doctorEmail: "",
        hospital: "",
        medications: [
          { drugName: "", dosage: "", frequency: "", duration: "" },
        ],
        remarks: "",
      });
    } catch (error) {
      console.error("Error submitting prescription:", error.response);
      alert("Failed to submit prescription. Please try again.");
    }
  };

  // Return a loading state while fetching user data
  if (loading) {
    return (
      <main id="main" className="main">
        <h4>Loading...</h4>
      </main>
    );
  }

  return (
    <main id="main" className="main">
      <PageTitle title="Add Prescription" url="/medicalstaff/addprescription" />
      <h4>Add New Prescription</h4>
      <hr />
      {errorMessage && (
        <Alert variant="danger">{errorMessage} Redirecting back...</Alert>
      )}

      <Form onSubmit={handleSubmit} disabled={isFormDisabled}>
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
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => removeMedication(index)}
                  className="me-2"
                  disabled={isFormDisabled}
                >
                  Remove
                </Button>
              )}
            </Col>
          </Row>
        ))}

        <Button
          variant="secondary"
          onClick={addMedication}
          className="mt-2"
          disabled={isFormDisabled}
        >
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
            disabled={isFormDisabled}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={isFormDisabled}
        >
          Submit Prescription
        </Button>
      </Form>
    </main>
  );
}

export default PrescriptionForm;

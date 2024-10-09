import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

function CreateMedicalRecordForm() {
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state management with default values for hospital, createdBy, and createdByPosition
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    gender: "Male", // Default value
    doctorName: "",
    doctorId: "",
    diagnosis: "",
    symptoms: "",
    remarks: "",
    hospital: "Medi Help", // Assigning dummy value
    createdBy: "Doctor123", // Assigning dummy value
    createdByPosition: "Senior Doctor", // Assigning dummy value
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection and validation
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type (PDF) and size (max 5MB)
      if (selectedFile.type !== "application/pdf") {
        setErrorMessage("Please upload a valid PDF file.");
        setFile(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMessage("File size should be less than 5 MB.");
        setFile(null);
        return;
      }

      setErrorMessage(null); // Clear error if validation passes
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Please select a PDF file to upload.");
      return;
    }

    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }
    submitData.append("medicalDocument", file);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records`,
        {
          method: "POST",
          body: submitData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setFeedbackMessage("Medical record created successfully!");
      setErrorMessage(null);

      // Reset form and clear file
      setFile(null);
      setFormData({
        patientId: "",
        patientName: "",
        patientAge: "",
        gender: "Male",
        doctorName: "",
        doctorId: "",
        diagnosis: "",
        symptoms: "",
        remarks: "",
        hospital: "General Hospital", // Reset to dummy value
        createdBy: "Doctor123", // Reset to dummy value
        createdByPosition: "Senior Doctor", // Reset to dummy value
      });
      event.target.reset(); // Reset form fields
    } catch (error) {
      console.error("Failed to submit the form:", error);
      setErrorMessage("Failed to create medical record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle />
      <Container fluid style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
        <Row>
          <Col md={12}>
            {feedbackMessage && (
              <Alert variant="success">{feedbackMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Patient Information Section */}
              <h5>Patient Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Patient ID"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Patient Name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="patientAge"
                      value={formData.patientAge}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Patient Age"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              {/* Doctor Information Section */}
              <h5>Doctor Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Doctor Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Doctor ID"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Medical Information Section */}
              <h5>Medical Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control
                      type="text"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Diagnosis"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Control
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Symptoms (comma separated)"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Document Upload */}
              <h5>Document Upload</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Medical Document (PDF)</Form.Label>
                    <Form.Control
                      type="file"
                      name="medicalDocument"
                      onChange={handleFileChange}
                      required
                      accept="application/pdf"
                    />
                    <Form.Text className="text-muted">
                      Please upload a valid PDF file (max 5MB).
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Remarks */}
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      placeholder="Enter any remarks"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default CreateMedicalRecordForm;

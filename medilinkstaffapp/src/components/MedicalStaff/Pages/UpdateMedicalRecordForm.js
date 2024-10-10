import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

function UpdateMedicalRecordForm() {
  const { id } = useParams(); // Get the record ID from the route params
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state management
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    gender: "",
    doctorName: "",
    doctorId: "",
    diagnosis: "",
    symptoms: "",
    remarks: "",
    hospital: "",
    createdBy: "",
    createdByPosition: "",
  });

  // Fetch the medical record by ID when the component mounts
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const record = await response.json();
        setFormData(record); // Set the fetched data in the form
      } catch (error) {
        setErrorMessage("Failed to fetch medical record. Please try again.");
      }
    };
    fetchMedicalRecord();
  }, [id]);

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
    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }
    if (file) {
      submitData.append("medicalDocument", file); // Only append the file if it's selected
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/medical-records/${id}`,
        {
          method: "PUT",
          body: submitData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setFeedbackMessage("Medical record updated successfully!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Failed to update the medical record:", error);
      setErrorMessage("Failed to update medical record. Please try again.");
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default UpdateMedicalRecordForm;

import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import { useNavigate } from "react-router-dom";

// Dummy patient data
const patientData = {
  P12345: { name: "John Doe", age: 35, contact: "1234567890" },
  P1002: { name: "Jane Smith", age: 29, contact: "0987654321" },
  P1003: { name: "Michael Johnson", age: 42, contact: "1122334455" },
};

function CreateReportForm() {
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [reportType, setReportType] = useState("laboratory");

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

  // Auto-fill patient details when patient ID is entered
  const handlePatientIdChange = (event) => {
    const enteredPatientId = event.target.value;
    setPatientId(enteredPatientId);

    const patient = patientData[enteredPatientId];
    if (patient) {
      setPatientName(patient.name);
      setAge(patient.age);
      setPatientContact(patient.contact);
    } else {
      // Reset patient fields if ID doesn't match
      setPatientName("");
      setAge("");
      setPatientContact("");
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    //formData.append("resultPdf", file);
    formData.append("patientName", patientName);
    formData.append("age", age);
    formData.append("patientContact", patientContact);

    // Add current date
    const currentDate = new Date().toISOString();
    formData.append("date", currentDate);

    // Add laboratorist/radiologist details based on report type
    if (reportType === "laboratory") {
      formData.append("laboratoristId", "LAB123");
      formData.append("laboratoristName", "Dr. Lab Specialist");
    } else if (reportType === "radiology") {
      formData.append("radiologistId", "RAD456");
      formData.append("radiologistName", "Dr. Radiology Expert");
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/medicalinfo/reports/createWithFile",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setFeedbackMessage("Report created successfully!");
      setErrorMessage(null);

      // Reset form and clear file
      setFile(null);
      event.target.reset(); // Reset form fields
      navigate("/mltstaff/reportlist");
    } catch (error) {
      console.error("Failed to submit the form:", error);
      setErrorMessage("Failed to create report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Create Medical Report" url="/mltstaff/createreport" />
      <Container fluid style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
        <Row>
          <Col md={12}>
            {feedbackMessage && (
              <Alert variant="success">{feedbackMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <h3>Create medical report (Radiology/Laboratory)</h3>
            <hr />

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Report Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="reportType"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      required
                    >
                      <option value="laboratory">Laboratory</option>
                      <option value="radiology">Radiology</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              {/* Patient Information Section */}
              <h5>Patient Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientId"
                      value={patientId}
                      onChange={handlePatientIdChange}
                      required
                      //pattern="\d+"
                      placeholder="Enter Patient ID"
                    />
                    <Form.Text className="text-muted">
                      Patient ID must be numeric.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      disabled
                      value={patientName}
                      readOnly
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      disabled
                      value={age}
                      readOnly
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientContact"
                      disabled
                      value={patientContact}
                      readOnly
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Doctor Information Section */}
              <h5>Doctor Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctor"
                      required
                      placeholder="Enter Doctor Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hospital</Form.Label>
                    <Form.Control
                      type="text"
                      name="hospital"
                      required
                      placeholder="Enter Hospital Name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lab Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="labName"
                      required
                      placeholder="Enter Lab Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lab Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="labContact"
                      required
                      pattern="^\d{10}$"
                      placeholder="Enter Lab Contact (10 digits)"
                    />
                    <Form.Text className="text-muted">
                      Please enter a valid 10-digit lab contact number.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              {/* Test Information Section */}
              <h5>Test Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Test Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="testName"
                      required
                      placeholder="Enter Test Name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="remarks"
                      placeholder="Enter any remarks"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Report PDF File</Form.Label>
                    <Form.Control
                      type="file"
                      name="resultPdf"
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

export default CreateReportForm;

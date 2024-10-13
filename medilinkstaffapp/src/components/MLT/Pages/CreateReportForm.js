import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have AuthContext

function CreateReportForm() {
  const { user } = useAuthContext(); // Get user from context
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true); // Loading state for user data
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [reportType, setReportType] = useState(""); // Set based on user subject
  const [doctor, setDoctor] = useState("");
  const [labName, setLabName] = useState("");
  const [labContact, setLabContact] = useState("");
  const [testName, setTestName] = useState("");
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  // Function to calculate age based on dateOfBirth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
      setErrorMessage(null);
      setFile(selectedFile);
    }
  };

  // Wait for user to be fully loaded and assign reportType
  useEffect(() => {
    if (user) {
      if (user && user.subject === "Laboratory") {
        setReportType("laboratory"); // Get report type from user context
      } else if (user && user.subject === "Radiology") {
        setReportType("radiology"); // Get report type from user context
      }
      setIsUserLoading(false); // Set user loading state to false once user is loaded
    }
  }, [user]);

  // Fetch patient details from backend when patient ID is entered
  const handlePatientIdChange = async (event) => {
    const enteredPatientId = event.target.value;
    setPatientId(enteredPatientId);

    if (enteredPatientId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/patients/getbyid/${enteredPatientId}`
        );
        if (!response.ok) {
          throw new Error("Patient not found");
        }
        const patient = await response.json();
        setPatientName(patient.name);
        setPatientContact(patient.phone);

        // Calculate age from dateOfBirth
        const derivedAge = calculateAge(patient.dateOfBirth);
        setAge(derivedAge);
      } catch (error) {
        setErrorMessage("Error fetching patient details. Please try again.");
        setPatientName("");
        setAge("");
        setPatientContact("");
      }
    } else {
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

    const formData = new FormData();
    formData.append("reportType", reportType);
    formData.append("patientId", patientId);
    formData.append("patientName", patientName);
    formData.append("age", age);
    formData.append("patientContact", patientContact);
    formData.append("doctor", doctor);
    formData.append("hospital", user.hospital); // From user context
    formData.append("labName", labName);
    formData.append("labContact", labContact);
    formData.append("testName", testName);
    formData.append("remarks", remarks);
    formData.append("date", new Date().toISOString()); // Current date
    formData.append("resultPdf", file);

    // Add laboratorist/radiologist details based on the reportType
    if (reportType === "laboratory") {
      formData.append("laboratoristId", user.mltId);
      formData.append("laboratoristName", user.name);
    } else if (reportType === "radiology") {
      formData.append("radiologistId", user.mltId);
      formData.append("radiologistName", user.name);
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/medicalinfo/reports/createWithFile`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setFeedbackMessage("Report created successfully!");
      setErrorMessage(null);

      setFile(null);
      event.target.reset();
      navigate("/mltstaff/reportlist");
    } catch (error) {
      setErrorMessage("Failed to create report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Wait until user data is loaded
  if (isUserLoading) {
    return (
      <main id="main" className="main">
        <h4>Loading...</h4>
      </main>
    );
  }

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
              {/* Report Type is automatically set based on user context */}
              <h5>Report Type: {reportType}</h5>

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
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      required
                      placeholder="Enter Doctor Name"
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
                      value={labName}
                      onChange={(e) => setLabName(e.target.value)}
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
                      value={labContact}
                      onChange={(e) => setLabContact(e.target.value)}
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
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
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
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
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

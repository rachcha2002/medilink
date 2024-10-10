import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import "./Main.css";
import PageTitle from "../../Main/PageTitle";
import { useParams } from "react-router-dom";

function UpdateReportForm() {
  const { reportType, reportId } = useParams();
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [reportData, setReportData] = useState({
    patientId: "",
    patientName: "",
    age: "",
    patientContact: "",
    reportType: "laboratory",
    labName: "",
    labContact: "",
    remarks: "",
  });

  // Fetch existing report data by ID when the component is mounted
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/medicalinfo/reports/page/${reportType}/${reportId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReportData({
          patientId: data.patientId,
          patientName: data.patientName,
          age: data.age,
          patientContact: data.patientContact,
          reportType: data.reportType,
          labName: data.labName,
          labContact: data.labContact,
          remarks: data.remarks,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchReport();
  }, [reportId]);

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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("labName", reportData.labName);
    formData.append("labContact", reportData.labContact);
    formData.append("remarks", reportData.remarks);
    if (file) {
      formData.append("resultPdf", file);
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/medicalinfo/reports/${reportType}/${reportId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setFeedbackMessage("Report updated successfully!");
      setErrorMessage(null);

      // Reset file input
      setFile(null);
    } catch (error) {
      console.error("Failed to submit the form:", error);
      setErrorMessage("Failed to update the report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle field updates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevState) => ({ ...prevState, [name]: value }));
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
              {/* Patient Information */}
              <h5>Patient Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientId"
                      value={reportData.patientId}
                      disabled
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      value={reportData.patientName}
                      disabled
                      readOnly
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
                      value={reportData.age}
                      disabled
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientContact"
                      value={reportData.patientContact}
                      disabled
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Editable Fields */}
              <h5>Update Report Details</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lab Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="labName"
                      value={reportData.labName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Lab Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="labContact"
                      value={reportData.labContact}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="remarks"
                      value={reportData.remarks}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload New Report PDF</Form.Label>
                    <Form.Control
                      type="file"
                      name="resultPdf"
                      onChange={handleFileChange}
                      accept="application/pdf"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Update"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default UpdateReportForm;

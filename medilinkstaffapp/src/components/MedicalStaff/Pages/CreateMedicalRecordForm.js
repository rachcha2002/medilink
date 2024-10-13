import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from ".././../../context/AuthContext";

function CreateMedicalRecordForm() {
  const { user, usertype } = useAuthContext(); // This might be loading asynchronously
  const [file, setFile] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [doctorValidationMessage, setDoctorValidationMessage] = useState(null); // State for doctor validation
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Set default form data
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
    hospital: "",
    createdBy: "",
    createdByPosition: "",
  });

  // Effect to assign values from user when available
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        hospital: user.hospital || "Heelan",
        createdBy: user.doctorId || user.nurseId || "Rachith",
        createdByPosition: usertype || "nurse",
      }));
    }
  }, [user]); // Only runs when the user object is updated

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch patient details when patientId is entered
    if (name === "patientId" && value) {
      fetchPatientDetails(value);
    }

    // Check doctor validity and fetch doctor name when doctorId is entered
    if (name === "doctorId" && value) {
      checkDoctorId(value);
    }
  };

  // Function to calculate age from date of birth
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

  // Fetch patient details based on patientId
  const fetchPatientDetails = async (patientId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/patients/getbyid/${patientId}`
      );
      if (!response.ok) {
        throw new Error("Patient not found");
      }

      const patient = await response.json();
      // Populate form fields with patient data
      setFormData((prevData) => ({
        ...prevData,
        patientName: patient.name,
        patientAge: calculateAge(patient.dateOfBirth),
        gender: patient.gender,
      }));

      setFeedbackMessage("Patient details fetched successfully.");
      setErrorMessage(null);
    } catch (error) {
      console.error("Failed to fetch patient details:", error);
      setErrorMessage("Failed to fetch patient details. Please try again.");
      setFeedbackMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check doctor ID validity and fetch doctor name
  const checkDoctorId = async (doctorId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors/${doctorId}`
      );
      if (!response.ok) {
        setDoctorValidationMessage("Doctor ID not found"); // Error message if doctor is not found
        setFormData((prevData) => ({
          ...prevData,
          doctorName: "", // Clear doctor name if ID not valid
        }));
        throw new Error("Doctor ID not found");
      }

      const doctor = await response.json();
      // Populate doctor name if doctor ID is valid
      setFormData((prevData) => ({
        ...prevData,
        doctorName: doctor.name, // Assuming the response contains the doctor's name
      }));
      setDoctorValidationMessage("Valid Doctor ID"); // Success message if doctor exists
    } catch (error) {
      console.error("Failed to validate doctor ID:", error);
    }
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
      navigate("/medicalstaff/medicalrecords");
    } catch (error) {
      console.error("Failed to submit the form:", error);
      setErrorMessage("Failed to create medical record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle
        title="Create Medical Record"
        url="/medicalstaff/addprescription"
      />

      <h4>Create New Medical Record</h4>
      <hr />

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
                    <Form.Label>Doctor ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter Doctor ID"
                    />
                    {/* Display Doctor Validation Message */}
                    {doctorValidationMessage && (
                      <Form.Text
                        className={
                          doctorValidationMessage === "Valid Doctor ID"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {doctorValidationMessage}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory to navigate
import { Modal, Button } from "react-bootstrap";
import { useAuthContext } from "../../Context/AuthContext";

import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import Spacing from "../../Components/Spacing/Spacing";

const PatientDetails = ({ match }) => {
  const {user,logout} = useAuthContext();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use history to navigate
  // State to control modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Open the delete confirmation modal
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // Close the delete confirmation modal
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // Fetch patient details from the database
  useEffect(() => {
    const fetchPatientDetails = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/patients/getbyid/${user.patientID}`
      );
      const data = await res.json();
      setPatient(data);
      setLoading(false);
    };

    fetchPatientDetails();
  }, []);

  // Function to delete profile (after confirming from modal)
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/patients/delete/${user.patientID}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        alert("Patient profile deleted successfully.");
       logout()// Redirect after deletion
      } else {
        alert("Failed to delete the profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("An error occurred while deleting the profile.");
    }
    handleCloseDeleteModal(); // Close modal after deletion
  };

  // Navigate to the update form
  const handleUpdate = () => {
    navigate(`/patient/update/${user.patientID}`); // Navigate to the update form
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!patient) {
    return <p>Patient not found.</p>;
  }

  return (
    <>
      <section id="patient-profile" className="st-shape-wrap st-gray-bg mb-6">
        <div className="st-shape4">
          <img src="/shape/section_shape.png" alt="shape" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <SectionHeading
          title={`Patient Details: ${patient.name}`}
          subTitle="Details about the patient's profile and medical information."
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="st-appointment-form">
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <div className="photo-preview">
                      <img
                        src={patient.photoURL}
                        alt="Patient Photo"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Full Name</label>
                      <p>{patient.name}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Patient ID</label>
                      <p>{patient.patientID}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Email Address</label>
                      <p>{patient.email}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Phone Number</label>
                      <p>{patient.phone}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Date of Birth</label>
                      <p>
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Gender</label>
                      <p>{patient.gender}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>National ID or Passport Number</label>
                      <p>{patient.idNumber}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Address</label>
                      <p>{patient.address}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Emergency Contact</label>
                      <p>{patient.emergencyContact}</p>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="st-form-field st-style1">
                      <label>Medical History</label>
                      <p>{patient.medicalHistory}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Current Diagnoses</label>
                      <p>{patient.currentDiagnoses}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Current Medications</label>
                      <p>{patient.currentMedications}</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="st-form-field st-style1">
                      <label>Allergies</label>
                      <p>{patient.allergies}</p>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-8">
                    <Spacing lg={80} md={40} />
                    <p>
                      Profile Created:{" "}
                      {new Date(patient.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Buttons for Update and Delete */}
                  <div className="col-lg-12 mb-8">
                    <button
                      className="st-btn st-style1 st-color1 st-size-medium"
                      onClick={handleUpdate}
                    >
                      Update Profile
                    </button>

                    <button
                      className="st-btn st-style1 st-color2 st-size-medium"
                      onClick={handleShowDeleteModal}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Spacing lg={200} md={80} />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientDetails;

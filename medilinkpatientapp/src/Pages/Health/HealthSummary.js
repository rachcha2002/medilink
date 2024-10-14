import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to navigate
import {
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaNotesMedical,
} from "react-icons/fa"; // Import icons from react-icons
import { useAuthContext } from "../../Context/AuthContext";
import { Card } from "react-bootstrap";

import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import Spacing from "../../Components/Spacing/Spacing";

const HealthSummary = () => {
  const { user, logout } = useAuthContext();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, [user.patientID]);

  // Calculate age from birth date
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Navigate to different sections
  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!patient) {
    return <p>Patient not found.</p>;
  }

  return (
    <section id="health-summary" className="st-shape-wrap st-gray-bg mb-2">
      <div className="st-shape4">
        <img src="/shape/section_shape.png" alt="shape" />
      </div>
      <div className="st-height-b120 st-height-lg-b20" />
      <SectionHeading
        title={`Health Summary: ${patient.name}`}
        subTitle="Overview of the patient's medical history, current diagnosis, and medication."
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="st-appointment-form">
              <div className="row">
                {/* Age and Medical History */}
                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Age</label>
                    <p>{calculateAge(patient.dateOfBirth)} years</p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="st-form-field st-style1">
                    <label>Medical History</label>
                    <p>{patient.medicalHistory}</p>
                  </div>
                </div>

                {/* Current Diagnosis and Medication */}
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

                {/* Touchable Cards */}
                <div className="col-lg-12">
                  <Spacing lg={80} md={20} />
                  <div className="row">
                    {/* Medical Records Card */}
                    <div className="col-lg-4 col-md-6 mb-4">
                      <Card
                        className="text-center st-card st-style1"
                        onClick={() => handleNavigate("/health/medicalrecords")}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Body>
                          <FaFileMedical size={50} />
                          <Card.Title>Medical Records</Card.Title>
                        </Card.Body>
                      </Card>
                    </div>

                    {/* Prescriptions Card */}
                    <div className="col-lg-4 col-md-6 mb-4">
                      <Card
                        className="text-center st-card st-style1"
                        onClick={() => handleNavigate("/health/prescriptions")}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Body>
                          <FaPrescriptionBottleAlt size={50} />
                          <Card.Title>Prescriptions</Card.Title>
                        </Card.Body>
                      </Card>
                    </div>

                    {/* Medical Reports Card */}
                    <div className="col-lg-4 col-md-6 mb-4">
                      <Card
                        className="text-center st-card st-style1"
                        onClick={() => handleNavigate("/health/medicalreports")}
                        style={{ cursor: "pointer" }}
                      >
                        <Card.Body>
                          <FaNotesMedical size={50} />
                          <Card.Title>Medical Reports</Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={30} md={10} />
    </section>
  );
};

export default HealthSummary;

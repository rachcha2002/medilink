import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Use this to handle the update navigation
import "./Main.css";
import PageTitle from "../../Main/PageTitle";

function DoctorsList({ toggleLoading }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation for update

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors`
        );
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors/${doctorId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setDoctors(doctors.filter((doctor) => doctor.doctorId !== doctorId));
        } else {
          throw new Error("Failed to delete doctor");
        }
      } catch (err) {
        setError("Failed to delete doctor");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = (doctorId) => {
    // Navigate to the update page for the selected doctor
    navigate(`/medicalstaff/update/Doctor/${doctorId}`);
  };

  return (
    <main id="main" className="main">
      <PageTitle />
      <div className="container">
        <h2 className="my-4">Doctors List</h2>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : doctors.length === 0 ? (
          <Alert variant="warning">No records found</Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th> {/* New column for image */}
                <th>Doctor ID</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Speciality</th>
                <th>Working Hours</th>
                <th>Hospital</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={doctor.doctorId}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    {/* Display the doctor image */}
                  </td>
                  <td>{doctor.doctorId}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.nic}</td>
                  <td>{doctor.contactNo}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.speciality}</td>
                  <td>{doctor.workingHours.join(", ")}</td>
                  <td>{doctor.hospital}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(doctor.doctorId)}
                      className="mb-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(doctor.doctorId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </main>
  );
}

export default DoctorsList;

import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Use this to handle the update navigation
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have AuthContext

function DoctorsList({ toggleLoading }) {
  const { user } = useAuthContext(); // Fetch user data from context
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
  const [hospitalName, setHospitalName] = useState(""); // Hospital name from user data
  const [isUserLoading, setIsUserLoading] = useState(true); // Loading state for user data
  const navigate = useNavigate(); // Initialize navigation for update

  // Wait for user data to load and assign hospital name
  useEffect(() => {
    if (user && user.hospitalName) {
      setHospitalName(user.hospitalName);
      setIsUserLoading(false); // Mark user data as loaded
    }
  }, [user]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!hospitalName) return; // Wait until hospitalName is assigned

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/doctors/hospital/${hospitalName}`
        );
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data); // Set filtered doctors initially
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch doctors");
        setLoading(false);
      }
    };

    if (!isUserLoading) {
      fetchDoctors(); // Fetch doctors only after user data is loaded
    }
  }, [hospitalName, isUserLoading]);

  // Handle search query changes and filter the doctors
  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.doctorId
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

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
          setFilteredDoctors(
            filteredDoctors.filter((doctor) => doctor.doctorId !== doctorId)
          );
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
    navigate(`/hospitaladmin/updatemedicalstaff/Doctor/${doctorId}`);
  };

  if (isUserLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading user data...</span>
      </Spinner>
    );
  }

  return (
    <div className="container">
      <h2 className="my-4">Doctors List</h2>

      {/* Search Input */}
      <Form.Group className="mb-3" controlId="searchQuery">
        <Form.Control
          type="text"
          placeholder="Search by Doctor ID, Name, NIC, or Speciality"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredDoctors.length === 0 ? (
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
            {filteredDoctors.map((doctor, index) => (
              <tr key={doctor.doctorId}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "10%",
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
  );
}

export default DoctorsList;

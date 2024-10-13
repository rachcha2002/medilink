import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have AuthContext

function NursesList({ toggleLoading }) {
  const { user } = useAuthContext(); // Get user from context
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredNurses, setFilteredNurses] = useState([]); // State for filtered nurses
  const [hospitalName, setHospitalName] = useState(""); // Hospital name from user data
  const [isUserLoading, setIsUserLoading] = useState(true); // Loading state for user data

  // Wait for user data to load and assign hospital name
  useEffect(() => {
    if (user && user.hospitalName) {
      setHospitalName(user.hospitalName);
      setIsUserLoading(false); // Mark user data as loaded
    }
  }, [user]);

  // Fetch nurses data when hospitalName is assigned
  useEffect(() => {
    const fetchNurses = async () => {
      if (!hospitalName) return; // Wait until hospitalName is assigned

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/nurses/hospital/${hospitalName}`
        );
        setNurses(response.data);
        setFilteredNurses(response.data); // Set filtered nurses initially
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch nurses");
        setLoading(false);
      }
    };

    if (!isUserLoading) {
      fetchNurses(); // Fetch nurses only after user data is loaded
    }
  }, [hospitalName, isUserLoading]);

  // Handle search query changes and filter nurses
  useEffect(() => {
    const filtered = nurses.filter(
      (nurse) =>
        nurse.nurseId
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nurse.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNurses(filtered);
  }, [searchQuery, nurses]);

  // Handle nurse deletion
  const handleDelete = async (nurseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this nurse?"
    );
    if (confirmDelete) {
      try {
        toggleLoading(true);
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/nurses/${nurseId}`
        ); // API endpoint to delete nurse
        setNurses(nurses.filter((nurse) => nurse.nurseId !== nurseId)); // Remove nurse from the state
        setFilteredNurses(
          filteredNurses.filter((nurse) => nurse.nurseId !== nurseId)
        ); // Remove from filtered results
        toggleLoading(false);
      } catch (err) {
        setError("Failed to delete nurse");
        toggleLoading(false);
      }
    }
  };

  // Handle nurse update (this can redirect to an update form)
  const handleUpdate = (nurseId) => {
    // Redirect to update nurse form or open a modal
    window.location.href = `/hospitaladmin/updatemedicalstaff/Nurse/${nurseId}`; // Adjust this as per your routing
  };

  // Wait until user data is loaded
  if (isUserLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading user data...</span>
      </Spinner>
    );
  }

  return (
    <div className="container">
      <h2 className="my-4">Nurses List</h2>

      {/* Search Input */}
      <Form.Group className="mb-3" controlId="searchQuery">
        <Form.Control
          type="text"
          placeholder="Search by Nurse ID, Name, or NIC"
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
      ) : filteredNurses.length === 0 ? (
        <Alert variant="warning">No records found</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nurse ID</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Hospital</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {filteredNurses.map((nurse, index) => (
              <tr key={nurse.nurseId}>
                <td>{index + 1}</td>
                <td>{nurse.nurseId}</td>
                <td>{nurse.name}</td>
                <td>{nurse.nic}</td>
                <td>{nurse.contactNo}</td>
                <td>{nurse.email}</td>
                <td>{nurse.hospital}</td>
                <td>
                  {/* Update and Delete buttons */}
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleUpdate(nurse.nurseId)}
                    className="m-1"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(nurse.nurseId)}
                    className="m-1"
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

export default NursesList;

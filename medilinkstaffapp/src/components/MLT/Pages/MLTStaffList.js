import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Main/Main.css";
import PageTitle from "../../Common/PageTitle";
import { useAuthContext } from "../../../context/AuthContext"; // Assuming you have AuthContext

function MLTStaffList({ toggleLoading }) {
  const { user } = useAuthContext(); // Get user from context
  const [mltStaff, setMltStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hospitalName, setHospitalName] = useState(""); // Hospital from user context
  const [isUserLoading, setIsUserLoading] = useState(true); // User loading state
  const navigate = useNavigate();

  // Wait for user data to load and set hospital name
  useEffect(() => {
    if (user && user.hospitalName) {
      setHospitalName(user.hospitalName);
      setIsUserLoading(false); // Mark user as loaded
    }
  }, [user]);

  // Fetch MLT staff based on hospital once the hospital name is set
  useEffect(() => {
    const fetchMLTStaff = async () => {
      if (!hospitalName) return; // Only fetch if hospital name is set
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/mltstaff/hospital/${hospitalName}`
        );
        const data = await response.json();
        setMltStaff(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch MLT staff");
        setLoading(false);
      }
    };

    if (!isUserLoading) {
      fetchMLTStaff(); // Fetch MLT staff only after user is fully loaded
    }
  }, [hospitalName, isUserLoading]);

  const handleDelete = async (mltId) => {
    if (window.confirm("Are you sure you want to delete this MLT staff?")) {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/staffroutes/mltstaff/${mltId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          setMltStaff(mltStaff.filter((mlt) => mlt.mltId !== mltId));
        } else {
          throw new Error("Failed to delete MLT staff");
        }
      } catch (err) {
        setError("Failed to delete MLT staff");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = (mltId) => {
    // Navigate to the update page for the selected MLT staff
    navigate(`/hospitaladmin/updatemltstaff/${mltId}`);
  };

  // Show loading spinner while user data is being fetched
  if (isUserLoading) {
    return (
      <main id="main" className="main">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </main>
    );
  }

  return (
    <main id="main" className="main">
      <PageTitle title="MLT Staff" url="/hospitaladmin/mltstaff" />
      <Button
        variant="dark"
        onClick={() => navigate("/hospitaladmin/addmltstaff")}
      >
        Add New Staff
      </Button>
      <div className="container">
        <h2 className="my-4">MLT Staff List</h2>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : mltStaff.length === 0 ? (
          <Alert variant="warning">No records found</Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th> {/* Column for image */}
                <th>MLT ID</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Contact No</th>
                <th>Email</th>
                <th>Speciality</th>
                <th>Subject</th>
                <th>Hospital</th>
                <th>Actions</th> {/* Column for actions */}
              </tr>
            </thead>
            <tbody>
              {mltStaff.map((mlt, index) => (
                <tr key={mlt.mltId}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={mlt.photoUrl}
                      alt={mlt.name}
                      className="border border-10"
                      style={{ width: "50px", height: "50px" }}
                    />{" "}
                    {/* Display MLT staff image */}
                  </td>
                  <td>{mlt.mltId}</td>
                  <td>{mlt.name}</td>
                  <td>{mlt.nic}</td>
                  <td>{mlt.contactNo}</td>
                  <td>{mlt.email}</td>
                  <td>{mlt.speciality}</td>
                  <td>{mlt.subject}</td>
                  <td>{mlt.hospital}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(mlt.mltId)}
                      className="mb-2"
                    >
                      Update
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(mlt.mltId)}
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

export default MLTStaffList;

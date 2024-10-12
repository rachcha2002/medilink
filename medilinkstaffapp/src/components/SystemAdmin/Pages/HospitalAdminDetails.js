import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import PageTitle from '../../Common/PageTitle';
import "../../Main/Main.css";

export default function HospitalAdminDetails() {
  const [hospitalAdminData, setHospitalAdminData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    // Fetch the data from backend API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/gethospitaladmins`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setHospitalAdminData(data); // Set the fetched data into state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle the Update button click
  const handleUpdateClick = (admin) => {
    setSelectedAdmin(admin); // Set the admin data to the selected one
    setShowModal(true); // Show the modal
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/updateAdmin/${selectedAdmin._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedAdmin),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Admin updated successfully!");
        setShowModal(false); // Close the modal

        // Optionally, refresh the admin data after update
        setHospitalAdminData((prevData) =>
          prevData.map((admin) =>
            admin._id === data._id ? data : admin
          )
        );
      })
      .catch((error) => console.error("Error updating admin:", error));
  };

  //Function to handle admin deletion
  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      // Send delete request to the backend
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/deletehospitaladmin/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Admin deleted successfully!");

            // Remove the admin from the state after deletion
            setHospitalAdminData((prevData) =>
              prevData.filter((admin) => admin._id !== id)
            );
          } else {
            alert("Failed to delete the admin.");
          }
        })
        .catch((error) => console.error("Error deleting admin:", error));
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Hospital Admin Details" url="/systemadmin/admins" />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th><center>Admin ID</center></th>
            <th><center>Hospital Name</center></th>
            <th><center>Admin Name</center></th>
            <th><center>Admin Email</center></th>
            <th><center>Admin Contact</center></th>
            <th><center>Action</center></th>
          </tr>
        </thead>
        <tbody>
          {hospitalAdminData.length > 0 ? (
            hospitalAdminData.map((admin, index) => (
              <tr key={index}>
                <td>{admin.adminID}</td>
                <td>{admin.hospitalName}</td>
                <td>{admin.adminName}</td>
                <td>{admin.adminEmail}</td>
                <td>{admin.adminContact}</td>
                <td>
                  <center>
                    <Button 
                      variant="warning" 
                      style={{ marginRight: 5 }} 
                      onClick={() => handleUpdateClick(admin)}
                    >
                      Update
                    </Button>
                    <Button variant="danger" style={{ marginLeft:5 }} onClick={() => handleDeleteClick(admin._id)}>
                      Delete
                    </Button>
                  </center>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for updating Hospital Admin Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Admin Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAdmin && (
            <Form onSubmit={handleFormSubmit}>
              {/* Admin Name */}
              <Form.Group className="mb-2">
                <Form.Label>Admin Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAdmin.adminName || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      adminName: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

               {/* Hospital Name */}
               <Form.Group className="mb-2">
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAdmin.hospitalName || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      hospitalName: e.target.value,
                    })
                  }
                  required
                  readOnly
                />
              </Form.Group>

              {/* Admin Email */}
              <Form.Group className="mb-2">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedAdmin.adminEmail || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      adminEmail: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              {/* Admin Contact */}
              <Form.Group className="mb-2">
                <Form.Label>Admin Contact</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAdmin.adminContact || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      adminContact: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}

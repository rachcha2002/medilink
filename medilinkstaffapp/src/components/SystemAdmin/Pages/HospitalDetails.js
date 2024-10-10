import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Image, Card } from 'react-bootstrap';
import PageTitle from '../../Common/PageTitle'
import "../../Main/Main.css";

export default function HospitalDetails() {
  const [hospitalData, setHospitalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    hospitalEmail: '',
    contactNumber: '',
    hospitalType: '',
    services: []
  });

  useEffect(() => {
    // Fetch the data from backend API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospitals`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setHospitalData(data); // Set the fetched data into state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleShowDetails = async (id) => {
    try {
      // Fetch the hospital details from the backend using the hospital ID
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospital/${id}`);
      const hospitalData = await response.json();
  
      // Set the selected hospital data
      setSelectedHospital(hospitalData);
      
      // Set form data with the hospital details to show them in the modal
      setFormData({
        hospitalName: hospitalData.hospitalName,
        address: hospitalData.address,
        hospitalEmail: hospitalData.hospitalEmail,
        contactNumber: hospitalData.contactNumber,
        hospitalType: hospitalData.hospitalType,
        services: hospitalData.serviceDetails || []
      });
  
      // Set the image preview if the hospital has an image
      setImagePreview(hospitalData.image || null);
  
      // Open the modal to show hospital details
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching hospital details:", err.message);
    }
  };
  

  // Function to handle the Update button click
  const handleUpdateClick = (hospital) => {
    setSelectedHospital(hospital); // Set the hospital data to the selected one
    setImagePreview(hospital.imageURL); // Set the current image as preview
    setShowModal(true); // Show the modal
  };

  // Function to handle the image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Show the image preview
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare form data including the image
    const formData = new FormData();
    formData.append("hospitalName", selectedHospital.hospitalName);
    formData.append("address", selectedHospital.address);
    formData.append("hospitalEmail", selectedHospital.hospitalEmail);
    formData.append("contactNumber", selectedHospital.contactNumber);
    formData.append("hospitalType", selectedHospital.hospitalType);
    
    // Append the image if it's a new upload, otherwise retain the existing image in the backend
    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    // Send the updated data to the backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/updatehospital/${selectedHospital._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Hospital updated successfully!");
        setShowModal(false); // Close the modal
        // Optionally, refresh the hospital data after update
        setHospitalData((prevData) =>
          prevData.map((hosp) =>
            hosp._id === data._id ? data : hosp
          )
        );
      })
      .catch((error) => console.error("Error updating hospital:", error));
  };

   // Function to handle hospital deletion
   const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this hospital?")) {
      // Send delete request to the backend
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/deletehospital/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Hospital deleted successfully!");
            // Remove the hospital from the state after deletion
            setHospitalData((prevData) =>
              prevData.filter((hospital) => hospital._id !== id)
            );
          } else {
            alert("Failed to delete the hospital.");
          }
        })
        .catch((error) => console.error("Error deleting hospital:", error));
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Hospital Details" url="/systemadmin/details" />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th><center>Registration ID</center></th>
            <th><center>Hospital Name</center></th>
            <th><center>Address</center></th>
            <th><center>Hospital Email</center></th>
            <th><center>Contact Number</center></th>
            <th><center>Hospital Type</center></th>
            <th><center>Services Provided</center></th>
            <th><center>Action</center></th>
          </tr>
        </thead>
        <tbody>
          {hospitalData.length > 0 ? (
            hospitalData.map((hospital, index) => (
              <tr key={index}>
                <td>{hospital.registrationID}</td>
                <td>{hospital.hospitalName}</td>
                <td>{hospital.address}</td>
                <td>{hospital.hospitalEmail}</td>
                <td>{hospital.contactNumber}</td>
                <td>{hospital.hospitalType}</td>
                <td>
                  {/* Display serviceDetails as a list */}
                  <ul>
                    {hospital.serviceDetails &&
                      hospital.serviceDetails.map((service, idx) => (
                        <li key={idx}>
                          <strong>{service.heading}</strong>: {service.description}
                        </li>
                      ))}
                  </ul>
                </td>
                <td>
                  <center>
                    <Button variant="primary" style={{ marginBottom: 2 }} onClick={() => handleShowDetails(hospital._id)}>
                      Details
                    </Button>
                    <Button variant="danger" style={{ marginTop: 2 }} onClick={() => handleDeleteClick(hospital._id)}>
                      Delete
                    </Button>
                  </center>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for viewing Hospital Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Hospital Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {selectedHospital && (
          
              <Card.Img 
                variant="top" 
                src={selectedHospital.imageURL} 
                alt={selectedHospital.hospitalName} 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
      )}
        {/* Hospital Name */}
        <Form.Group className="mb-2">
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            type="text"
            value={selectedHospital?.hospitalName || ""}
            readOnly
          />
        </Form.Group>

        {/* Address */}
        <Form.Group className="mb-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={selectedHospital?.address || ""}
            readOnly
          />
        </Form.Group>

        {/* Hospital Email */}
        <Form.Group className="mb-2">
          <Form.Label>Hospital Email</Form.Label>
          <Form.Control
            type="email"
            value={selectedHospital?.hospitalEmail || ""}
            readOnly
          />
        </Form.Group>

        {/* Contact Number */}
        <Form.Group className="mb-2">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            value={selectedHospital?.contactNumber || ""}
            readOnly
          />
        </Form.Group>

        {/* Hospital Type */}
        <Form.Group className="mb-2">
          <Form.Label>Hospital Type</Form.Label>
          <Form.Control
            as="select"
            value={selectedHospital?.hospitalType || ""}
            readOnly
          >
            <option value="government">Government Hospital</option>
            <option value="private">Private Hospital</option>
            <option value="medicenter">Medical Center</option>
            <option value="laboratory">Laboratory</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
    </Modal>
    </main>
  )
}

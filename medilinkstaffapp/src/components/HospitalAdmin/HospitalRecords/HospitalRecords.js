import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Modal, Card, Spinner, Image } from "react-bootstrap";
import PageTitle from "../../Common/PageTitle";
import "../../Main/Main.css";
import { AuthContext } from "../../../context/AuthContext"; // Import the AuthContext

export default function HospitalRecords() {
  const { user, token } = useContext(AuthContext); // Get user and token from AuthContext
  const [hospitalData, setHospitalData] = useState(null); // Only one hospital for each admin
  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    hospitalEmail: "",
    contactNumber: "",
    hospitalType: "",
    tests: [],
    scans: [],
  });

  useEffect(() => {
    // Fetch the admin's hospital from backend API
    if (user && user.adminID) {
      console.log("adminID", user.adminID);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/gethospitalbyadmin/${user.adminID}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setHospitalData(data); // Set the fetched hospital data
        })
        .catch((error) => console.error("Error fetching hospital data:", error));
    }
  }, [user, token]);

  const handleShowDetails = () => {
    if (hospitalData) {
      // Set the selected hospital and form data
      setSelectedHospital(hospitalData);
      setFormData({
        hospitalName: hospitalData.hospitalName,
        address: hospitalData.address,
        hospitalEmail: hospitalData.hospitalEmail,
        contactNumber: hospitalData.contactNumber,
        hospitalType: hospitalData.hospitalType,
        tests: hospitalData.tests || [],
        scans: hospitalData.scans || [],
      });

      // Set the image preview
      setImagePreview(hospitalData.image || null);
      setShowModal(true);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Show image preview
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

   // Add new test input fields
   const handleAddTest = () => {
    setFormData((prevData) => ({
      ...prevData,
      tests: [...prevData.tests, { test_heading: "" }],
    }));
  };

  // Add new scan input fields
  const handleAddScan = () => {
    setFormData((prevData) => ({
      ...prevData,
      scans: [...prevData.scans, { scan_heading: "" }],
    }));
  };

  // Update test input fields
  const handleTestChange = (index, value) => {
    const updatedTests = [...formData.tests];
    updatedTests[index].test_heading = value;
    setFormData((prevData) => ({
      ...prevData,
      tests: updatedTests,
    }));
  };

  // Update scan input fields
  const handleScanChange = (index, value) => {
    const updatedScans = [...formData.scans];
    updatedScans[index].scan_heading = value;
    setFormData((prevData) => ({
      ...prevData,
      scans: updatedScans,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when submitting

    const updatedFormData = new FormData();
    updatedFormData.append("hospitalName", formData.hospitalName);
    updatedFormData.append("address", formData.address);
    updatedFormData.append("hospitalEmail", formData.hospitalEmail);
    updatedFormData.append("contactNumber", formData.contactNumber);
    updatedFormData.append("hospitalType", formData.hospitalType);
    updatedFormData.append("tests", JSON.stringify(formData.tests));
    updatedFormData.append("scans", JSON.stringify(formData.scans));

    if (e.target.image.files[0]) {
      updatedFormData.append("hospitalImage", e.target.image.files[0]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/updatehospital/${selectedHospital._id}`, {
        method: "PUT",
        body: updatedFormData,
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      const data = await response.json();
      alert("Hospital updated successfully!");
      setShowModal(false); // Close modal
      setHospitalData(data); // Update the hospital data in state
    } catch (error) {
      console.error("Error updating hospital:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Hospital Details" url="/hospitaladmin/hospitaldetails" />
      {hospitalData ? (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{hospitalData.hospitalName}</Card.Title>
            {hospitalData && (
            <Card.Img 
            variant="top" 
            src={hospitalData.imageURL} 
            alt={hospitalData.hospitalName} 
            style={{ height: '200px', width: '50%', objectFit: 'cover' }} 
            />
  )}
            <Card.Text className="mt-3">
              <strong>Registration ID:</strong> {hospitalData.registrationID}
            </Card.Text>
            <Card.Text>
              <strong>Address:</strong> {hospitalData.address}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {hospitalData.hospitalEmail}
            </Card.Text>
            <Card.Text>
              <strong>Contact:</strong> {hospitalData.contactNumber}
            </Card.Text>
            <Card.Text>
              <strong>Type:</strong> {hospitalData.hospitalType}
            </Card.Text>
            <Card.Text>
              <strong>Tests Offered:</strong>
               <ul>
             {(hospitalData.tests || []).map((test, index) => (
              <li key={index}>{test.test_heading}</li>
             ))}
             </ul>
            </Card.Text>
            <Card.Text>
             <strong>Scans Offered:</strong>
              <ul>
              {(hospitalData.scans || []).map((scan, index) => (
              <li key={index}>{scan.scan_heading}</li>
               ))}
              </ul>
             </Card.Text>
            <Button variant="primary" onClick={handleShowDetails}>
              Edit Details
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Spinner animation="border" />
      )}

      {/* Modal for Updating Hospital Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hospital Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Image Preview */}
            {hospitalData && (
            <Card.Img 
            variant="top" 
            src={hospitalData.imageURL} 
            alt={hospitalData.hospitalName} 
            style={{ height: '200px', width: '50%', objectFit: 'cover' }} 
            />
  )}
            {imagePreview && 
            <Card.Img 
            variant="top" 
            src={imagePreview} 
            alt="Hospital Image" 
            style={{ height: '200px', width: '50%', objectFit: 'cover' }} 
            />}
            <Form.Group className="mb-3">
              <Form.Label>Change Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>

            {/* Hospital Name */}
            <Form.Group className="mb-3">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleFormChange}
              />
            </Form.Group>

            {/* Address */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
              />
            </Form.Group>

            {/* Hospital Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="hospitalEmail"
                value={formData.hospitalEmail}
                onChange={handleFormChange}
              />
            </Form.Group>

            {/* Contact Number */}
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleFormChange}
              />
            </Form.Group>

            {/* Hospital Type */}
            <Form.Group className="mb-3">
              <Form.Label>Hospital Type</Form.Label>
              <Form.Control
                as="select"
                name="hospitalType"
                value={formData.hospitalType}
                onChange={handleFormChange}
              >
                <option value="government">Government</option>
                <option value="private">Private</option>
                <option value="medicenter">Medical Center</option>
                <option value="laboratory">Laboratory</option>
              </Form.Control>
            </Form.Group>

              {/* Test Details */}
            <Form.Group className="mb-2">
              <Form.Label>Test Details</Form.Label>
              <ul>
                {formData.tests.map((test, index) => (
                  <li key={index}>
                    <Form.Control
                      type="text"
                      value={test.test_heading}
                      onChange={(e) => handleTestChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <Button variant="secondary" onClick={handleAddTest}>
                Add New Test
              </Button>
            </Form.Group>

            {/* Scan Details */}
            <Form.Group className="mb-2">
              <Form.Label>Scan Details</Form.Label>
              <ul>
                {formData.scans.map((scan, index) => (
                  <li key={index}>
                    <Form.Control
                      type="text"
                      value={scan.scan_heading}
                      onChange={(e) => handleScanChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <Button variant="secondary" onClick={handleAddScan}>
                Add New Scan
              </Button>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
}

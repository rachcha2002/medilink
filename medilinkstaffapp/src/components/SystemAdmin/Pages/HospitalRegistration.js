import {React,useState, useEffect} from 'react'
import {
    Container,
    Form,
    Row,
    Col,
    Button,
    InputGroup,
    Image
  } from "react-bootstrap";
  import { useForm, Controller } from "react-hook-form";
  import { FaPlusCircle } from "react-icons/fa";
  import { BsInfoCircle } from "react-icons/bs";
  import { useNavigate } from "react-router-dom";
import PageTitle from '../../Common/PageTitle'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../Main/Main.css";

export default function HospitalRegistration() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const {
        control,
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
      } = useForm();
      const [testDetails, setTestDetails] = useState([{ test_heading: ""}]);
      const [scanDetails, setScanDetails] = useState([{ scan_heading: ""}]);
      const navigate = useNavigate();

      useEffect(() => {
        // Generate a dynamic admin ID
        const generateAdminID = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/gethospitaladmins`);
            const adminCount = response.data.length;
            const newAdminID = `H${String(adminCount + 1).padStart(3, "0")}`; // Admin ID format: A001, A002, etc.
            setValue("adminID", newAdminID); // Set the generated admin ID in the form
          } catch (error) {
            console.error("Error generating admin ID", error);
          }
        };
        
        generateAdminID();
      }, [setValue]); // Runs once when the component mounts

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Save the selected file to the state
    
        // Generate a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set the preview URL
        };
        reader.readAsDataURL(file);
      };
    
      const handleAddTest = () => {
        setTestDetails([...testDetails, { test_heading: ""}]);
      };
      const handleAddScan = () => {
        setScanDetails([...scanDetails, {scan_heading: ""}]);
      };
    
    const onSubmit = async (data) => {
    // Create FormData to send the image and other fields
    const formData = new FormData();

    // Append hospital data to FormData
    formData.append("hospitalName", data.hospitalName);
    formData.append("registrationID", data.registrationId);
    formData.append("address", data.address);
    formData.append("contactNumber", data.contactNumber);
    formData.append("hospitalEmail", data.hospitalEmail);
    formData.append("hospitalType", data.hospitalType);
    formData.append("tests", JSON.stringify(testDetails)); // Send test details as a string
    formData.append("scans", JSON.stringify(scanDetails)); // Send scan details as a string
    formData.append("hospitalImage", image); // Append the selected image

    console.log("Admin ID: ", data.adminID);
    formData.append("adminID", data.adminID);


        try {
          // API call to add hospital information
          const hospitalResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/addhospital`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Important to send FormData
            },
          });
      
          // Extract the saved hospital ID from the response
          const savedHospitalId = hospitalResponse.data.savedHospital._id; // Assuming the MongoDB ID is available in this field
      
          // Prepare admin data with the retrieved hospital ID as registrationID
          const adminData = {
            adminID: data.adminID,
            adminName: data.adminName,
            adminEmail: data.adminEmail,
            adminContact: data.adminContact,
            hospitalName: data.hospitalName,
            registrationID: savedHospitalId, // Assign the MongoDB ID to the registration ID
          };
      

    

          // API call to add hospital admin information
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/hospitaladmin/addhospitaladmin`, adminData);
          alert("Hospital registered successfully");
          // On successful submission, navigate or display success message
          navigate("/systemadmin");
        } catch (error) {
          console.error("Error submitting the form", error);
          // Handle error appropriately, like showing an error message
        }
      };
  return (
    <main id="main" className="main">
      <PageTitle title="Hospital Registration Form" url="/systemadmin/registerhospital" />
      <Container
        className="my-1 p-4 rounded"
        style={{
          maxWidth: "1000px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
             {/* Patient Information */}
          <h5 className="mb-2"><b>Hospital Information</b></h5>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Hospital Name'
                  {...register("hospitalName", {
                    required: "Hospital name is required",
                  })}
                />
                {errors.hospitalName && (
                  <small className="text-danger">
                    {errors.hospitalName.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hospital Registration ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='PHRC/PH/01'
                  {...register("registrationId", {
                    required: "Hospital Registration ID is required",
                  })}
                />
                {errors.registrationId && (
                  <small className="text-danger">
                    {errors.registrationId.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
          <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Hospital Address'
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <small className="text-danger">
                    {errors.address.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Hotline Number'
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit contact number",
                    },
                  })}
                />
                {errors.contactNumber && (
                  <small className="text-danger">
                    {errors.contactNumber.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            </Row>
            <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hospital Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder='Enter Hospital Email'
                  {...register("hospitalEmail", {
                    required: "Hospital email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.hospitalEmail && (
                  <small className="text-danger">
                    {errors.hospitalEmail.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
            <Form.Label>Hospital Type</Form.Label>
            <Controller
              name="hospitalType"
              control={control}
              rules={{ required: "Hospital type is required" }}
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="">Select Hospital Type</option>
                  <option value="government">Government Hospital</option>
                  <option value="private">Private Hospital</option>
                  <option value="medicenter">Medical Center</option>
                  <option value="labarotary">Labarotary</option>
                </Form.Select>
              )}
            />
            {errors.hospitalType && (
              <small className="text-danger">{errors.hospitalType.message}</small>
            )}
          </Form.Group>
            </Col>
            <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} thumbnail fluid alt="Image Preview" />
              </div>
            )}
          </Form.Group>
            </Row>
          
         
          {/* Hospital tests Details */}
          <h5 className="mt-2 mb-3"><b>Service Details</b></h5>
          <h6 className="mt-2 mb-3"><b>Tests Details</b></h6>
            <Row className="mb-3">
            {testDetails.map((test, index) => (
              <Col md={6}>
              <Form.Group>
                  <Form.Label>Test Heading</Form.Label>
                  <InputGroup>
                  <Form.Control
                    type="text"
                    value={test.test_heading}
                    onChange={(e) => {
                      const updatedTests = [...testDetails];
                      updatedTests[index].test_heading = e.target.value;
                      setTestDetails(updatedTests);
                    }}
                  />
                  <InputGroup.Text>
                      <BsInfoCircle title="Provide a title for the test" />
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
              </Col> 
            ))}
            <Row>
            <Col md={6}>
            <Button variant="secondary" onClick={handleAddTest} className="mb-3 mt-3">
                <FaPlusCircle /> Add Test Details
            </Button>
            </Col>
            </Row>
            </Row>
            <h6 className="mt-2 mb-3"><b>Scan Details</b></h6>
            <Row className="mb-3">
            {scanDetails.map((scan, index) => (
              <Col md={6}>
              <Form.Group>
                  <Form.Label>Scan Heading</Form.Label>
                  <InputGroup>
                  <Form.Control
                    type="text"
                    value={scan.scan_heading}
                    onChange={(e) => {
                      const updatedScans = [...scanDetails];
                      updatedScans[index].scan_heading = e.target.value;
                      setScanDetails(updatedScans);
                    }}
                  />
                  <InputGroup.Text>
                      <BsInfoCircle title="Provide a title for the scan" />
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
              </Col>
              ))}
               <Row>
               <Col md={6}>
              <Button variant="secondary" onClick={handleAddScan} className="mb-3 mt-3">
              <FaPlusCircle /> Add Scan Details
              </Button>
              </Col>
              </Row>
            </Row>

          {/* Hospital Admin Information */}
          <h5 className="mt-2 mb-2"><b>Hospital Admin Information</b></h5>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hospital Admin ID</Form.Label>
                <Form.Control
                  type="text"
                  {...register("adminID", {
                    required: "Admin ID is required",
                  })}
                  readOnly
                />
                {errors.adminID && (
                  <small className="text-danger">
                    {errors.adminID.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Admin Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Admin Name'
                  {...register("adminName", {
                    required: "Total amount is required",
                  })}
                />
                {errors.adminName && (
                  <small className="text-danger">
                    {errors.adminName.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Admin workplace email'
                  {...register("adminEmail", {
                    required: "Total amount is required",
                  })}
                />
                {errors.adminEmail && (
                  <small className="text-danger">
                    {errors.adminEmail.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Admin Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Enter Admin Contact Number'
                  {...register("adminContact", {
                    required: "Total amount is required",
                  })}
                />
                {errors.adminContact && (
                  <small className="text-danger">
                    {errors.adminContact.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          
          {/* Submit and Cancel Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/systemadmin")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  )
}

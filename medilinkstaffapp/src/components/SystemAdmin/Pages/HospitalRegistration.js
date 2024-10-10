import {React,useState} from 'react'
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
        formState: { errors },
      } = useForm();
      const [serviceDetails, setServiceDetails] = useState([{ heading: "", description: "" }]);
      const navigate = useNavigate();

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
    
      const handleAddService = () => {
        setServiceDetails([...serviceDetails, { heading: "", description: "" }]);
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
    formData.append("serviceDetails", JSON.stringify(serviceDetails)); // Send service details as a string
    formData.append("hospitalImage", image); // Append the selected image
    
        const adminData = {
          adminID: data.adminID,
          adminName: data.adminName,
          adminEmail: data.adminEmail,
          adminContact: data.adminContact,
        };
    
        try {
          // API call to add hospital information
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/addhospital`, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Important to send FormData
            },
          });
    
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
          
         
          {/* Hospital Services Details */}
          <h5 className="mt-2 mb-3"><b>Service Details</b></h5>
          {serviceDetails.map((service, index) => (
            <Row className="mb-3" key={index}>
              <Col md={5}>
              <Form.Group>
                  <Form.Label>Service Heading</Form.Label>
                  <InputGroup>
                  <Form.Control
                    type="text"
                    value={service.heading}
                    onChange={(e) => {
                      const updatedServices = [...serviceDetails];
                      updatedServices[index].heading = e.target.value;
                      setServiceDetails(updatedServices);
                    }}
                  />
                  <InputGroup.Text>
                      <BsInfoCircle title="Provide a title for the service" />
                    </InputGroup.Text>
                    </InputGroup>
                </Form.Group>
              </Col>
              <Col md={7}>
              <Form.Group>
                  <Form.Label>Service Description</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={service.description}
                      onChange={(e) => {
                        const updatedServices = [...serviceDetails];
                        updatedServices[index].description = e.target.value;
                        setServiceDetails(updatedServices);
                      }}
                    />
                    <InputGroup.Text>
                      <BsInfoCircle title="Provide a brief description of the service" />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddService} className="mb-3">
            <FaPlusCircle /> Add Service
          </Button>

          {/* Hospital Admin Information */}
          <h5 className="mt-2 mb-2"><b>Hospital Admin Information</b></h5>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Hospital Admin ID</Form.Label>
                <Form.Control
                  type="text"
                  {...register("adminID", {
                    required: "Total amount is required",
                  })}
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

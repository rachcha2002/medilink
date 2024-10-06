import React, { useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTitle from "../../../Common/PageTitle";

const BillingForm = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [serviceDetails, setServiceDetails] = useState([]);
  const navigate = useNavigate();

  const handleAddService = () => {
    setServiceDetails([...serviceDetails, { description: "", cost: "" }]);
  };

  const onSubmit = async (data) => {
    try {
      // Combine the form data with service details
      const formData = { ...data, serviceDetails };

      // Send POST request to the backend API
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing`,
        formData
      );

      // Handle success
      console.log("Form Data Submitted Successfully:", response.data);

      // Show confirmation and redirect
      const userConfirmed = window.confirm(
        "Form submitted successfully! Click OK to proceed to the payment page."
      );

      if (userConfirmed) {
        navigate("/hospitaladmin/payment");
      } else {
        reset();
        setServiceDetails([]);
      }
    } catch (error) {
      // Handle error
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle title="Billing Form" url="/hospitaladmin/payment/createBill" />
      <Container
        className="my-5 p-4 rounded"
        style={{
          maxWidth: "1000px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3 className="text-center mb-4">Hospital Billing Form</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Billing Type Selection */}
          <h5 className="mb-3">Billing Type</h5>
          <Form.Group className="mb-3">
            <Controller
              name="billingType"
              control={control}
              rules={{ required: "Billing type is required" }}
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="">Select Billing Type</option>
                  <option value="Channeling">Channeling</option>
                  <option value="Admission">Admission</option>
                  <option value="Scan">Scan</option>
                  <option value="Lab Test">Lab Test</option>
                </Form.Select>
              )}
            />
            {errors.billingType && (
              <small className="text-danger">{errors.billingType.message}</small>
            )}
          </Form.Group>

          {/* Patient Information */}
          <h5 className="mt-4 mb-3">Patient Information</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("patientName", {
                    required: "Patient name is required",
                  })}
                />
                {errors.patientName && (
                  <small className="text-danger">
                    {errors.patientName.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient ID</Form.Label>
                <Form.Control
                  type="text"
                  {...register("patientID", {
                    required: "Patient ID is required",
                  })}
                />
                {errors.patientID && (
                  <small className="text-danger">
                    {errors.patientID.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
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
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("patientEmail", {
                    required: "Patient email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.patientEmail && (
                  <small className="text-danger">
                    {errors.patientEmail.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Billing Details */}
          <h5 className="mt-4 mb-3">Billing Details</h5>
          {serviceDetails.map((service, index) => (
            <Row className="mb-3" key={index}>
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
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    type="number"
                    value={service.cost}
                    onChange={(e) => {
                      const updatedServices = [...serviceDetails];
                      updatedServices[index].cost = e.target.value;
                      setServiceDetails(updatedServices);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddService} className="mb-3">
            <FaPlusCircle /> Add Service
          </Button>

          {/* Payment Information */}
          <h5 className="mt-4 mb-3">Payment Information</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Total Amount</Form.Label>
                <Form.Control
                  type="number"
                  {...register("totalAmount", {
                    required: "Total amount is required",
                  })}
                />
                {errors.totalAmount && (
                  <small className="text-danger">
                    {errors.totalAmount.message}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Controller
                  name="paymentMethod"
                  control={control}
                  rules={{ required: "Payment method is required" }}
                  render={({ field }) => (
                    <Form.Select {...field}>
                      <option value="">Select Payment Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="Insurance">Insurance</option>
                    </Form.Select>
                  )}
                />
                {errors.paymentMethod && (
                  <small className="text-danger">
                    {errors.paymentMethod.message}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Payment Status</Form.Label>
            <Controller
              name="paymentStatus"
              control={control}
              defaultValue="Pending"
              render={({ field }) => (
                <Form.Select {...field}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </Form.Select>
              )}
            />
          </Form.Group>

          {/* Submit and Cancel Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate("/hospitaladmin/payment")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default BillingForm

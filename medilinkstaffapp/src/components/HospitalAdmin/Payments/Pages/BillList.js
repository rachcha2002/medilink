import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  Badge,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ".././../../Main/Main.css";

const BillingList = () => {
  const [billingData, setBillingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState(null);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [billingTypeFilter, setBillingTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/payment/billing")
      .then((response) => {
        setBillingData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the billing data!", error);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (billing) => {
    setSelectedBilling(billing);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBilling(null);
    setErrors({});
  };

  const handleUpdate = () => {
    if (validateForm()) {
      axios
        .put(
          `http://localhost:5000/api/payment/billing/${selectedBilling._id}`,
          selectedBilling
        )
        .then(() => {
          setBillingData((prevData) =>
            prevData.map((bill) =>
              bill._id === selectedBilling._id ? selectedBilling : bill
            )
          );
          handleCloseModal();
          alert("Billing information updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating billing data:", error);
        });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this billing record?")) {
      axios
        .delete(
          `http://localhost:5000/api/payment/billing/${selectedBilling._id}`
        )
        .then(() => {
          setBillingData((prevData) =>
            prevData.filter((bill) => bill._id !== selectedBilling._id)
          );
          handleCloseModal();
          alert("Billing record deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting billing data:", error);
        });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedBilling.billingType)
      newErrors.billingType = "Billing type is required";
    if (!selectedBilling.patientName)
      newErrors.patientName = "Patient name is required";
    if (!selectedBilling.patientID)
      newErrors.patientID = "Patient ID is required";
    if (
      !selectedBilling.contactNumber ||
      !/^\d{10}$/.test(selectedBilling.contactNumber)
    ) {
      newErrors.contactNumber =
        "Contact number must be a valid 10-digit number";
    }
    if (
      !selectedBilling.patientEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selectedBilling.patientEmail)
    ) {
      newErrors.patientEmail = "Email is not valid";
    }
    if (selectedBilling.totalAmount <= 0)
      newErrors.totalAmount = "Total amount must be greater than zero";
    if (!selectedBilling.paymentMethod)
      newErrors.paymentMethod = "Payment method is required";
    if (!selectedBilling.paymentStatus)
      newErrors.paymentStatus = "Payment status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addServiceDetail = () => {
    setSelectedBilling({
      ...selectedBilling,
      serviceDetails: [
        ...selectedBilling.serviceDetails,
        { description: "", quantity: 1, cost: 0 },
      ],
    });
  };

  const removeServiceDetail = (index) => {
    const updatedServiceDetails = selectedBilling.serviceDetails.filter(
      (_, idx) => idx !== index
    );
    setSelectedBilling({
      ...selectedBilling,
      serviceDetails: updatedServiceDetails,
    });
  };

  const handleSearchAndFilter = () => {
    let filtered = billingData;

    // Filter by billing type
    if (billingTypeFilter) {
      filtered = filtered.filter(
        (bill) => bill.billingType === billingTypeFilter
      );
    }

    // Filter by payment method
    if (paymentMethodFilter) {
      filtered = filtered.filter(
        (bill) => bill.paymentMethod === paymentMethodFilter
      );
    }

    // Search by billNo, patient name or patient ID
    if (searchTerm) {
      filtered = filtered.filter(
        (bill) =>
          bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.patientID.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, billingTypeFilter, paymentMethodFilter, billingData]);

  if (loading) {
    return (
      <Container className="text-center mt-3">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container
      className="mt-3"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Billing Information</h1>
        <Button
          variant="primary"
          onClick={() => navigate("/hospitaladmin/payment/createBill")}
        >
          Add Bill
        </Button>
      </div>

      {/* Search and Filter Section */}
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search by Bill No, Name, or Patient ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bill No, name, or patient ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Billing Type</Form.Label>
              <Form.Control
                as="select"
                value={billingTypeFilter}
                onChange={(e) => setBillingTypeFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Channeling">Channeling</option>
                <option value="Admission">Admission</option>
                <option value="Scan">Scan</option>
                <option value="Lab Test">Lab Test</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Insurance">Insurance</option>
                {/* Add other payment methods as needed */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Table
        bordered
        hover
        responsive
        className="shadow-sm"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <thead className="bg-primary text-white">
          <tr>
            <th>Bill No</th>
            <th>Billing Type</th>
            <th>Patient Name</th>
            <th>Patient ID</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((billing, index) => (
            <tr key={index} onClick={() => handleShowModal(billing)}>
              <td>{billing.billNo}</td>
              <td>{billing.billingType}</td>
              <td>{billing.patientName}</td>
              <td>{billing.patientID}</td>
              <td>{billing.contactNumber}</td>
              <td>{billing.patientEmail}</td>
              <td>${billing.totalAmount.toFixed(2)}</td>
              <td>{billing.paymentMethod}</td>
              <td>
                <Badge
                  pill
                  bg={billing.paymentStatus === "Paid" ? "success" : "warning"}
                >
                  {billing.paymentStatus === "Paid" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationCircle />
                  )}{" "}
                  {billing.paymentStatus}
                </Badge>
              </td>
              <td>{new Date(billing.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedBilling && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Billing Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Bill No</Form.Label>
                    <Form.Control type="text" value={selectedBilling.billNo} disabled />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Billing Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.billingType}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          billingType: e.target.value,
                        })
                      }
                      isInvalid={!!errors.billingType}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.billingType}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.patientName}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          patientName: e.target.value,
                        })
                      }
                      isInvalid={!!errors.patientName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.patientName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.patientID}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          patientID: e.target.value,
                        })
                      }
                      isInvalid={!!errors.patientID}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.patientID}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.contactNumber}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          contactNumber: e.target.value,
                        })
                      }
                      isInvalid={!!errors.contactNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Patient Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={selectedBilling.patientEmail}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          patientEmail: e.target.value,
                        })
                      }
                      isInvalid={!!errors.patientEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.patientEmail}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedBilling.totalAmount}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          totalAmount: parseFloat(e.target.value),
                        })
                      }
                      isInvalid={!!errors.totalAmount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalAmount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.paymentMethod}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          paymentMethod: e.target.value,
                        })
                      }
                      isInvalid={!!errors.paymentMethod}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.paymentMethod}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Payment Status</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedBilling.paymentStatus}
                      onChange={(e) =>
                        setSelectedBilling({
                          ...selectedBilling,
                          paymentStatus: e.target.value,
                        })
                      }
                      isInvalid={!!errors.paymentStatus}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.paymentStatus}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Service Details</Form.Label>
                {selectedBilling.serviceDetails.map((service, index) => (
                  <div key={index} className="mb-3">
                    <Row>
                      <Col md={3}>
                        <Form.Control
                          type="text"
                          value={service.description}
                          placeholder="Description"
                          className="mb-1"
                          onChange={(e) => {
                            const updatedServiceDetails = [
                              ...selectedBilling.serviceDetails,
                            ];
                            updatedServiceDetails[index].description =
                              e.target.value;
                            setSelectedBilling({
                              ...selectedBilling,
                              serviceDetails: updatedServiceDetails,
                            });
                          }}
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          type="number"
                          value={service.quantity}
                          placeholder="Quantity"
                          className="mb-1"
                          onChange={(e) => {
                            const updatedServiceDetails = [
                              ...selectedBilling.serviceDetails,
                            ];
                            updatedServiceDetails[index].quantity = parseInt(
                              e.target.value
                            );
                            setSelectedBilling({
                              ...selectedBilling,
                              serviceDetails: updatedServiceDetails,
                            });
                          }}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="number"
                          value={service.cost}
                          placeholder="Cost"
                          onChange={(e) => {
                            const updatedServiceDetails = [
                              ...selectedBilling.serviceDetails,
                            ];
                            updatedServiceDetails[index].cost = parseFloat(
                              e.target.value
                            );
                            setSelectedBilling({
                              ...selectedBilling,
                              serviceDetails: updatedServiceDetails,
                            });
                          }}
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          onClick={() => removeServiceDetail(index)}
                          className="mb-1"
                        >
                          <FaTrash /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                <Button variant="success" onClick={addServiceDetail}>
                  <FaPlus /> Add Service
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default BillingList;

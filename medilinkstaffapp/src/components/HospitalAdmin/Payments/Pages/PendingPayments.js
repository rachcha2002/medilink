import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Spinner,
  Button,
  Badge,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import axios from "axios";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import html2pdf from "html2pdf.js";
import image from "../../../../images/logo.png"; // Correctly importing the logo image
import { useAuthContext } from "../../../../context/AuthContext";

const PendingPayments = () => {
  const { user } = useAuthContext();
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const hospitalID = user.registrationID;

  useEffect(() => {
    if (!hospitalID) return;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/hospital/${hospitalID}/pending`
      )
      .then((response) => {
        setPendingPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the pending payments!",
          error
        );
        setLoading(false);
      });
  }, [hospitalID]);

  const handleApprove = (paymentId) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/${paymentId}`,
        {
          paymentStatus: "Paid",
        }
      )
      .then(() => {
        setPendingPayments((prev) =>
          prev.map((payment) =>
            payment._id === paymentId
              ? { ...payment, paymentStatus: "Paid" }
              : payment
          )
        );
        alert("Payment approved successfully.");
        generatePDF(paymentId); // Generate the PDF after approval
      })
      .catch((error) => {
        console.error("Error approving payment:", error);
      });
  };

  const generatePDF = (paymentId) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/${paymentId}`
      )
      .then((response) => {
        const invoiceData = response.data;

        // Creating HTML structure for the PDF content
        const element = document.createElement("div");
        element.innerHTML = `
          <div style="padding: 30px; font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333;">
            <!-- Header Section -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <img src="${image}" alt="Hospital Logo" style="width: 150px;">
                <h4 style="color: #007BFF; margin-top: 10px;">${
                  invoiceData.hospitalName
                }</h4>
                <p style="margin: 5px 0;">${invoiceData.hospitalAddress}</p>
                <p style="margin: 5px 0;">Phone: ${
                  invoiceData.hospitalPhone
                }</p>
                <p style="margin: 5px 0;">Email: ${
                  invoiceData.hospitalEmail
                }</p>
              </div>
              <div style="text-align: right;">
                <h2 style="color: #555; margin: 0;">Invoice</h2>
                <p style="margin: 5px 0;"><strong>Bill No:</strong> ${
                  invoiceData.billNo
                }</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(
                  invoiceData.createdAt
                ).toLocaleDateString()}</p>
              </div>
            </div>
  
            <!-- Patient Information -->
           <!-- Patient Information -->
<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; display: flex; flex-direction: column;">
  <h4 style="color: #007BFF; margin-bottom: 10px;">Patient Information</h4>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 20px; row-gap: 10px;">
    <div>
      <p style="margin: 0;"><strong>Name:</strong> ${
        invoiceData.patientName
      }</p>
    </div>
    <div>
      <p style="margin: 0;"><strong>Email:</strong> ${
        invoiceData.patientEmail
      }</p>
    </div>
    
    <div>
      <p style="margin: 0;"><strong>Patient ID:</strong> ${
        invoiceData.patientID
      }</p>
    </div>
    <div>
      <p style="margin: 0;"><strong>Contact:</strong> ${
        invoiceData.contactNumber
      }</p>
    </div>
    
    <div>
      <p style="margin: 0;"><strong>Payment Method:</strong> ${
        invoiceData.paymentMethod
      }</p>
    </div>
    <div>
      <p style="margin: 0;"><strong>Payment Status:</strong> ${
        invoiceData.paymentStatus
      }</p>
    </div>
  </div>
</div>

  
            <!-- Services Table -->
            <div style="margin-bottom: 20px;">
              <h4 style="color: #007BFF; margin-bottom: 10px;">Billing Summary</h4>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead style="background-color: #f2f2f2;">
                  <tr>
                    <th style="padding: 10px; border: 1px solid #ddd;">Service</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceData.serviceDetails
                    .map(
                      (service) => `
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">${
                        service.description
                      }</td>
                      <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Rs. ${service.cost.toFixed(
                        2
                      )}</td>
                    </tr>`
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
  
            <!-- Total Amount -->
            <div style="text-align: right; margin-bottom: 30px;">
              <h3 style="margin: 0; color: #28a745;">Total: Rs. ${invoiceData.totalAmount.toFixed(
                2
              )}</h3>
            </div>
  
            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px;">
              <p>NOTE: This is a computer-generated invoice and does not require a physical signature.</p>
            </div>
          </div>
        `;

        const options = {
          margin: 1,
          filename: `invoice-${invoiceData.billNo}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Convert HTML to PDF and then upload to Firebase
        html2pdf()
          .set(options)
          .from(element)
          .toPdf()
          .get("pdf")
          .then(async (pdf) => {
            const blob = pdf.output("blob"); // Convert to blob

            const formData = new FormData();
            formData.append("file", blob, `invoice-${invoiceData.billNo}.pdf`);

            // Upload PDF to the backend using axios
            try {
              const uploadResponse = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/upload/uploadInvoice`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              const downloadURL = uploadResponse.data.downloadURL;

              // After uploading, update the backend with the download URL
              await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/${paymentId}`,
                {
                  downloadURL: downloadURL, // Save the invoice URL
                }
              );

              console.log("PDF uploaded successfully:", downloadURL);
              alert("PDF generated and uploaded to the cloud!");

              if (invoiceData.isAppointment) {
               

                await axios.put(
                  `${process.env.REACT_APP_BACKEND_URL}/api/appointment/completeappointment/${invoiceData.appointmentType}/${invoiceData.appointmentID}`,
                  {
                    payment: invoiceData.totalAmount, // Save the invoice URL
                  }
                );
              }
            } catch (error) {
              console.error("Error uploading the PDF:", error);
            }
          });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayments = pendingPayments.filter(
    (payment) =>
      payment.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.patientID.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h1>Pending Payments</h1>

      {/* Search bar for filtering by Bill No */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Bill No, Patient Name, or Patient ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.billNo}</td>
              <td>{payment.billingType}</td>
              <td>{payment.patientName}</td>
              <td>{payment.patientID}</td>
              <td>{payment.contactNumber}</td>
              <td>{payment.patientEmail}</td>
              <td>Rs.{payment.totalAmount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td>
                <Badge
                  pill
                  bg={
                    payment.paymentStatus === "Pending"
                      ? "warning"
                      : payment.paymentStatus === "Paid"
                      ? "success"
                      : "danger"
                  }
                >
                  {payment.paymentStatus === "Pending" ? (
                    <FaExclamationCircle />
                  ) : (
                    <FaCheckCircle />
                  )}{" "}
                  {payment.paymentStatus}
                </Badge>
              </td>
              <td>
                <ButtonGroup>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(payment._id)}
                    disabled={payment.paymentStatus !== "Pending"}
                    title="Approve"
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={payment.paymentStatus !== "Pending"}
                    title="Reject"
                  >
                    <FaTimes />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PendingPayments;

import React, { useEffect, useState } from "react";
import PaymentSuccess from "./PaymentSuccess"; // Importing PaymentSuccess component
import PaymentFailure from "./PaymentFailure";
import { Spinner } from "react-bootstrap"; // Importing Spinner from react-bootstrap
import axios from "axios";
import html2pdf from "html2pdf.js"; // Import html2pdf for generating PDFs
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import logo from "../../assets/images/common/logo-small-nobackground.png";

const PaymentVerification = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false); // Track if the bill is uploaded
  const [showSuccess, setShowSuccess] = useState(false); // Control success screen rendering
  const [uploading, setUploading] = useState(false); // Track if the upload is happening
  const [updating, setUpdating] = useState(false); // Track if the update is happening

  // Fetch payment data once component mounts
  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderIdParam = urlParams.get("order_id"); // Get orderId from URL parameters
      setOrderId(orderIdParam);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/onlinepayment/${orderIdParam}`
        );
        const data = await response.json();
        setPaymentData(data);
      } catch {
        setPaymentData({ status_code: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Call uploadBill when payment is successful, and it hasn't been uploaded yet
  useEffect(() => {
    if (paymentData && paymentData.status_code === 2 && paymentData.sv && !isUploaded) {
      uploadBill();
    }
  }, [paymentData, isUploaded]);

  const uploadBill = async () => {
    if (isUploaded) return; // Prevent further execution if already uploaded

    setUploading(true); // Start showing the spinner
    try {
      // Fetch the bill using the orderId
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/billno/${orderId}`
      );
      const billData = response.data;

      // Get the MongoDB object ID (assuming it's _id)
      const billId = billData._id;

      // Create HTML content for the PDF
      const element = document.createElement("div");
      element.innerHTML = `
        <div style="padding: 30px; font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333;">
          <!-- Header Section -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <img src="${logo}" alt="Hospital Logo" style="width: 150px;">
              <h4 style="color: #007BFF; margin-top: 10px;">${billData.hospitalName}</h4>
              <p style="margin: 5px 0;">${billData.hospitalAddress}</p>
              <p style="margin: 5px 0;">Phone: ${billData.hospitalPhone}</p>
              <p style="margin: 5px 0;">Email: ${billData.hospitalEmail}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #555; margin: 0;">Invoice</h2>
              <p style="margin: 5px 0;"><strong>Bill No:</strong> ${billData.billNo}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(billData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <!-- Patient Information -->
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
            <h4 style="color: #007BFF; margin-bottom: 10px;">Patient Information</h4>
            <p style="margin: 0;"><strong>Name:</strong> ${billData.patientName}</p>
            <p style="margin: 0;"><strong>Email:</strong> ${billData.patientEmail}</p>
            <p style="margin: 0;"><strong>Patient ID:</strong> ${billData.patientID}</p>
            <p style="margin: 0;"><strong>Contact:</strong> ${billData.contactNumber}</p>
            <p style="margin: 0;"><strong>Payment Method:</strong> ${billData.paymentMethod}</p>
            <p style="margin: 0;"><strong>Payment Status:</strong> ${billData.paymentStatus}</p>
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
                ${billData.serviceDetails
                  .map(
                    (service) => `
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${service.description}</td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">Rs. ${service.cost.toFixed(2)}</td>
                  </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Total Amount -->
          <div style="text-align: right; margin-bottom: 30px;">
            <h3 style="margin: 0; color: #28a745;">Total: Rs. ${billData.totalAmount.toFixed(2)}</h3>
          </div>

          <!-- Footer -->
          <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px;">
            <p>NOTE: This is a computer-generated invoice and does not require a physical signature.</p>
          </div>
        </div>
      `;

      // Set options for the PDF generation
      const options = {
        margin: 1,
        filename: `bill-${billData.billNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Convert HTML to PDF and then upload the PDF to the backend
      html2pdf()
        .set(options)
        .from(element)
        .toPdf()
        .get("pdf")
        .then(async (pdf) => {
          const blob = pdf.output("blob");

          const formData = new FormData();
          formData.append("file", blob, `bill-${billData.billNo}.pdf`);

          // Upload PDF to the backend
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

          // After uploading, update the backend with the download URL using the billId
          setUpdating(true);
          await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/payment/billing/${billId}`,
            {
              downloadURL: downloadURL, // Save the download URL
            }
          );
          setUpdating(false);

          console.log("Bill uploaded successfully:", downloadURL);
          

          // Set isUploaded to true to prevent future uploads and show the success screen
          setIsUploaded(true);
          setShowSuccess(true);
        });
    } catch (error) {
      console.error("Error uploading the bill:", error);
    } finally {
      setUploading(false); // Stop showing the spinner after upload is done
    }
  };

  // Always show spinner while loading, uploading, or updating
  if (loading || uploading || updating) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">
            {loading
              ? "Loading..."
              : uploading
              ? "Uploading bill..."
              : "Updating information..."}
          </span>
        </Spinner>
      </div>
    );
  }

  // Render success screen only if the bill is uploaded and payment is successful
  if (showSuccess) {
    return <PaymentSuccess />;
  }

  // Render failure screen if payment failed
  if (paymentData.status_code !== 2) {
    return <PaymentFailure />;
  }

  return null;
};

export default PaymentVerification;

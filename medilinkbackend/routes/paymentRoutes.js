const express = require('express');
const router = express.Router();

const billingController = require("../controllers/PaymentControllers/Billing");
const { paymentinitiate, handlePaymentNotification, getPaymentbyOrderID } = require("../controllers/PaymentControllers/OnlinePayments");
const { uploadInvoice } = require("../controllers/PaymentControllers/UploadBillToFirebase");
const { sendMail } = require("../config/nodemailer");

//use email service for billing
router.post("/email",sendMail)


// Create a new billing record
router.post("/billing", billingController.createBilling);

// Get all billing records
router.get("/billing", billingController.getAllBillings);

// Get a specific billing record by ID
router.get("/billing/:id", billingController.getBillingById);

// Update a billing record by ID
router.put("/billing/:id", billingController.updateBilling);

// Delete a billing record by ID
router.delete("/billing/:id", billingController.deleteBilling);

// Get pending payments
router.get("/billing/pending/pendingBills", billingController.getPendingPayments);

// Get bills by patient ID
router.get("/billing/patient/:patientID", billingController.getBillsByPatientId);

// Get bills by bill number
router.get('/billing/billno/:billNo', billingController.getBillByBillNo);

// Get bills by hospital ID
router.get("/billing/hospital/:hospitalID", billingController.getBillsByHospitalId);

// Get pending bills by hospital ID
router.get("/billing/hospital/:hospitalID/pending", billingController.getPendingBillsByHospitalId);

// Get billing record by appointment ID
router.get("/billing/appointment/:appointmentID", billingController.getBillByAppointmentId); // New Route



// Upload invoice
router.post("/billing/upload/uploadInvoice", uploadInvoice);

// Online payment initiation
router.post("/billing/onlinepayment/initiate", paymentinitiate);

// Handle payment notification
router.post("/billing/onlinepayment/handle", handlePaymentNotification);

// Get payment by order ID
router.get("/billing/onlinepayment/:order_id", getPaymentbyOrderID);

module.exports = router;
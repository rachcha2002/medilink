const express = require('express');
const router = express.Router();

const billingController = require("../controllers/PaymentControllers/Billing");
const {paymentinitiate,handlePaymentNotification,getPaymentbyOrderID} = require("../controllers/PaymentControllers/OnlinePayments");
const {uploadInvoice} = require("../controllers/PaymentControllers/UploadBillToFirebase")

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


router.post("/billing/upload/uploadInvoice",uploadInvoice);

router.post("/billing/onlinepayment/initiate",paymentinitiate)
router.post("/billing/onlinepayment/handle",handlePaymentNotification)
router.get("/billing/onlinepayment/:order_id",getPaymentbyOrderID)




module.exports = router;

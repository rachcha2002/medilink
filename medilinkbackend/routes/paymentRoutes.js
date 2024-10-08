const express = require('express');
const router = express.Router();

const billingController = require("../controllers/PaymentControllers/Billing");

router.post("/billing", billingController.createBilling);
router.get("/billing", billingController.getAllBillings);

router.get("/billing/:id", billingController.getBillingById);
router.put("/billing/:id", billingController.updateBilling);
router.delete("/billing/:id", billingController.deleteBilling);

// Route for fetching pending payments
router.get("/billing/pending/pendingbills", billingController.getPendingPayments);

module.exports = router;

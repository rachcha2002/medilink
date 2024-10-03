const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  updateBillById,
} = require('../controllers/PaymentControllers/Payment');

// Route to create a new bill
router.post('/', createBill);

// Route to get all bills
router.get('/', getAllBills);

// Route to get a bill by ID
router.get('/:id', getBillById);

// Route to update a bill by ID
router.put('/:id', updateBillById);

module.exports = router;

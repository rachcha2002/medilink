const Bill = require('../../models/PaymentModels/Bill');

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { customerName, amount, date, status } = req.body;

    const bill = new Bill({
      customerName,
      amount,
      date,
      status
    });

    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bill', error });
  }
};

// Get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bills', error });
  }
};

// Get bill by ID
const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bill', error });
  }
};

// Update bill by ID
const updateBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBill = await Bill.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bill', error });
  }
};

module.exports = {
  createBill,
  getAllBills,
  getBillById,
  updateBillById,
};

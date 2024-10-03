const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid',
  },
});

module.exports = mongoose.model('Bill', billSchema);

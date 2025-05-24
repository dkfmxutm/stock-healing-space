const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  holdings: [{
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    averagePrice: {
      type: Number,
      required: true,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Portfolio', portfolioSchema); 
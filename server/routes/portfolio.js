const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Get portfolio
router.get('/:userId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    res.json(portfolio || { userId: req.params.userId, holdings: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio
router.put('/:userId', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { holdings: req.body.holdings } },
      { new: true, upsert: true }
    );
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 
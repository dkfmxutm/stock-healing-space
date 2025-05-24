const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary');

// Get all diary entries
router.get('/:userId', async (req, res) => {
  try {
    const entries = await Diary.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create diary entry
router.post('/:userId', async (req, res) => {
  const entry = new Diary({
    userId: req.params.userId,
    date: new Date(req.body.date),
    mood: req.body.mood,
    entry: req.body.entry,
  });

  try {
    const newEntry = await entry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete diary entry
router.delete('/:userId/:entryId', async (req, res) => {
  try {
    await Diary.findOneAndDelete({
      _id: req.params.entryId,
      userId: req.params.userId,
    });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
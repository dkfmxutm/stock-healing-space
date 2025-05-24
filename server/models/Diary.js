const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mood: {
    type: String,
    enum: ['positive', 'neutral', 'worried', 'negative'],
    required: true,
  },
  entry: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Diary', diarySchema); 
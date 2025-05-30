const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: {
    type: String,
    enum: ['Work Environment', 'Leadership', 'Growth', 'Others'],
    required: true
  },
  isReviewed: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

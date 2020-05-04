const mongoose = require('mongoose');

const shinobiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The shinobi name is required.'],
    unique: true,
    trim: true,
  },
  clan: {
    type: String,
    trim: true,
  },
  rank: {
    type: String,
    trim: true,
  },
  sex: {
    type: String,
    trim: true,
  },
  classification: {
    type: [String],
    trim: true,
  },
  affiliation: {
    type: [String],
    trim: true,
  },
  jutsu: {
    type: [String],
    trim: true,
  },
  tools: {
    type: [String],
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Shinobi = mongoose.model('Shinobi', shinobiSchema);

module.exports = Shinobi;

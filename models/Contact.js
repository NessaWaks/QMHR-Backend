const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactName: String,
  contactEmail: String,
  contactMessage: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

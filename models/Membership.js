const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  homeAddress: String,
  phoneNumber: String,
  email: { type: String, unique: true, required: true },
  password: String,
  haveBaptism: Boolean,
  haveReceivedCommunion: Boolean,
  haveConfirmed: Boolean,
  societyGroup: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);

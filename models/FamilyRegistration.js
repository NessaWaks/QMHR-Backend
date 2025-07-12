const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  relationship: String,
  gender: String,
  baptized: Boolean,
  holyCommunion: Boolean,
  confirmed: Boolean,
  societyGroup: String,
});

const familySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: String,
  email: { type: String, unique: true, required: true },
  password: String,
  address: String,
  societyGroup: String,
  familyMembers: [familyMemberSchema],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

module.exports = mongoose.model('FamilyRegistration', familySchema);

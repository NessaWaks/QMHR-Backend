const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');


exports.signup = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already registered' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      const user = new User({ 
        email, 
        password: hashedPassword, 
        otp, 
        role: email === "omenisalem@gmail.com" ? "admin" : "user"
      });
      
      const token = generateToken(user); // ✅ now it's safe
  
      const html = `<p>Your OTP code is: <b>${otp}</b></p>`;
      await sendEmail(email, 'Your OTP Code - Queen of the Most Holy Rosary Parish', html);
  
      res.status(201).json({ message: 'OTP sent to your email.' });
    } catch (err) {
      console.error('Signup Error:', err); // Optional: for debugging in logs
      res.status(500).json({ error: err.message });
    }
  };
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ message: 'Account verified successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Correct: inside a function, after user is retrieved
const generateToken = (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      console.log('User not found:', email);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const valid = await bcrypt.compare(password, user.password);
      console.log('Password mismatch for user:', email);
      if (!valid) return res.status(401).json({ message: 'Incorrect password' });
  
      console.log('User not verified:', email);
      // if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });
  
      const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.json({ message: 'Login successful', token, role: user.role, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  
exports.resendOtp = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      await user.save();
  
      const html = `<p>Your new OTP code is: <b>${otp}</b></p>`;
      await sendEmail(email, 'Resend OTP - Parish Login', html);
  
      res.json({ message: 'OTP resent successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = resetOtp;
      await user.save();
  
      const html = `<p>Use this OTP to reset your password: <b>${resetOtp}</b></p>`;
      await sendEmail(email, 'Password Reset OTP', html);
  
      res.json({ message: 'OTP sent for password reset' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP or email' });
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.otp = null;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
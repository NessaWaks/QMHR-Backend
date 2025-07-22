const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/verify-key
router.post('/verify-key', (req, res) => {
  const { key } = req.body;

  // Match against your actual environment variable
  if (key === process.env.ADMIN_SECRET) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid secret key' });
  }
});

module.exports = router;

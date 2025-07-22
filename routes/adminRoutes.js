// routes/adminRoute.js
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/verify-key', (req, res) => {
  const { key } = req.body;

  if (key === process.env.ADMIN_SECRET) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid secret key' });
  }
});

module.exports = router;

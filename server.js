const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const membershipRoutes = require('./routes/membershipRoutes');
const familyRoutes = require('./routes/familyRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ✅ Enable CORS for development + production frontend domains
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.onrender.com',   // ← Replace with your real Render frontend domain
    'https://yourdomain.com'                // ← Replace with your custom domain if you have one
  ],
  credentials: true,
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Mount routes
app.use('/api/memberships', membershipRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

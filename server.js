const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const membershipRoutes = require('./routes/membershipRoutes');
const familyRoutes = require('./routes/familyRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes'); 

const app = express();

// ✅ Enable CORS for development + production frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://qmhr-parish.onrender.com', 
  'https://qmhr-catholic-church-x6pc.onrender.com' 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
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
app.use('/api', adminRoutes); // ✅ Just once and simplified to /api/verify-key

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

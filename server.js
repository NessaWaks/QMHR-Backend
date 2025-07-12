const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const membershipRoutes = require('./routes/membershipRoutes');
const familyRoutes = require('./routes/familyRoutes'); // ✅ Import family routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Mount routes
app.use('/api/memberships', membershipRoutes);
app.use('/api/families', familyRoutes); // ✅ Mount family routes
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

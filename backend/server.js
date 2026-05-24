const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Maps routes to http://localhost:5000/api/auth/login

// Database Connection
mongoose.connect('mongodb://localhost:27017/stylecart')
    .then(() => console.log("Database connected successfully!"))
    .catch(err => console.error("Database connection failed:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
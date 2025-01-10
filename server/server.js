require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to DB
connectDB();

// CORS Middleware
const corsOptions = {
    origin: '*', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

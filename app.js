const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // For managing cookies

const NewUser = require('./Routes/NewUser');
const VerifyUser = require('./Routes/VerifyUser');
const VerifyToken = require('./Routes/VerifyToken');
const GetProfile = require('./Routes/GetProfile');
const AddMessage = require('./Routes/AddMessage');
const cors = require('cors');

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://anonymous-app-frontend.vercel.app'], // Allow both local and deployed frontend
    credentials: true, // Enable credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
};



dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3001;


// Middleware
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Parse cookies from incoming requests


// MongoDB connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => console.log(`Backend server listening on port ${port}`))
    .catch(err => console.log(err));

// Route to create a new user (already implemented)
app.post('/create-user', NewUser);


// Route to verify user login
app.post('/verify-user', VerifyUser);

app.post('/verify-token', VerifyToken);

app.get('/profile', GetProfile);

app.post('/add-message', AddMessage);


export default app;
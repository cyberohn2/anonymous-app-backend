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

dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3001;


// Middleware
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Parse cookies from incoming requests


// MongoDB connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => app.listen(port, () => {
        console.log(`Backend server listening on port ${port}`);
    }))
    .catch(err => console.log(err));

// Route to create a new user (already implemented)
app.post('/create-user', NewUser);


// Route to verify user login
app.post('/verify-user', VerifyUser);

app.post('/verify-token', VerifyToken);

app.get('/profile', GetProfile);

app.post('/add-message', AddMessage);

// Fallback route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

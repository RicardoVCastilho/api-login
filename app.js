require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
connectDB();


const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Welcome to our API Stranger!' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



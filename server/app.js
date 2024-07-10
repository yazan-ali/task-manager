// app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
require('dotenv').config();

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;
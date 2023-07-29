// app.js
const express = require('express');
const app = express();

// Import the routing file
const routing = require('./routing');

// Use the routing module for handling routes
app.use('/', routing);

module.exports = app;


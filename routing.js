// routing.js
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello, this is the home page!');
});

router.get('/about', (req, res) => {
  res.send('Welcome to the about page!');
});

// Export the router so it can be used in app.js
module.exports = router;

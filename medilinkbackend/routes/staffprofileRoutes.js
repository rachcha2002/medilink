const express = require('express');
const router = express.Router();
const {login} = require('../controllers/profileControllers/profilecontroller'); // Adjust the path as needed

// Login route
router.post('/login', login);

module.exports = router;

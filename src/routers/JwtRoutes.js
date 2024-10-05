const express = require('express');
const createJwtToken = require('../controllers/JwtController');


const JwtRoutes = express.Router();

// Order create route
JwtRoutes.post('/jwt',createJwtToken);



module.exports = JwtRoutes;

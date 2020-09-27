const express = require('express');
let router = express.Router();
var users = require('./usersDB');
var backend = require('./FormDB');

// @params {Address} is /api
router.use('/users', users);//Go to my router file to fetch inputs
router.use('/backend', backend);//Go to my router file to fetch inputs


module.exports = router;
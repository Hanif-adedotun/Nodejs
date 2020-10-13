const express = require('express');
let router = express.Router();
var users = require('./users');
var backend = require('./Backend');
var passport = require('./passport');


// @params {Address} is /api


router.use('/users', users);//Go to my router file to fetch inputs
router.use('/auth', passport);
router.use('/middlewear/data', backend);//Go to my router file to fetch inputs


module.exports = router;
const express = require('express');
let router = express.Router();

router.route('/database').get((req, res) =>{
    res.send('Hello database');
});

module.exports = router;
var express = require('express');
var app = express();
var path = require('path');
const port = 8888;



app.get('/algorithms', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/Js Algorithms/base10toString.html'));
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// Change package.json to "start": "node express.js",
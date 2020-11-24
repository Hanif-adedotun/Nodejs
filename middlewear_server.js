const https = require("https");
const express = require('express');
const app = express();
const router = require('./Routes/router');
const port = process.env.port || 8080;
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:3000", // allow to server to accept request from different origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}));

app.use('/api', router);//Go to my router file to fetch inputs


app.get('/', function(req, res){
    res.status(403).send("Access Denied");
});

app.listen(port, () => console.log(`Voltex Middlewear on http://localhost:${port}`));
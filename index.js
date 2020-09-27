// const express = require('express');

// const app = express();
// app.use(express.static('static'));
// app.listen(8080, function () {
// console.log('App started on port 3000');
// });
// const express = require('express');
// const app = express();
// const port = 8080;

// app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.send('Hello World!, This is Hanif nodejs');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

var mysql = require('mysql');
var express = require('express');
var app = express();
const port = 8080;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hanif',
  password: 'hanif_mysql',
  database: 'ntb directive register',
});


connection.connect(function(err){
  if(err) throw err;
  console.log('Connected');

//var table = 'directive table';
var sql = "SELECT * FROM `directive table`";
  connection.query(sql,
    function(err, results){
      if(err) throw err;
      
      console.log('Results Ready');
      
      app.get('/', function(req, res){
        res.send('Results:' + JSON.stringify(results));
        console.log(req.url);
      });
      
      app.listen(port, function(){
        console.log(`Node.js, MySQL and Express listening at http://localhost:${port}`);
      });
      
      connection.end();
      // app.end();
    }
  );
});




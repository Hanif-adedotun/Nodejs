const express = require('express');
const app = express();
const router = require('./Routes/router');
const port = process.env.port || 8080;
const mysql = require('mysql');


app.use('/api', router);//Go to my router file to fetch inputs


// Delete this section when done with configuring mysql in userdb

//Connection detail to mysql database
var database = 'ntb directive register';
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
     
        var DBval = Array.from(results).forEach(function(element){
            console.log(typeof(element));
        });//check how to parse values from the database

        app.get('/dashboard', function(req, res){
            const DBvalues = [
                {id: 1, database: database, field1: 'Value 1', field2: 'Value 2'},
                {id: 2, database: database, field1: 'Value 1.1', field2: 'Value 2.1'},
                {id: 3, database: database, field1: 'Value 1.3', field2: 'Value 2.3'}
            ];
        
            res.json(DBvalues);
        });
        
        connection.end();
      }
    );
  });



app.get('/', function(req, res){
    res.status(403).send("Access Denied");
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
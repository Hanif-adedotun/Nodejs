var mysql = require('mysql');
const keys = require('../config/keys');


var DBdetails = {//connection details to the database
    host: keys.mysql.host,
    username: keys.mysql.username,
    password: keys.mysql.password
};


var createDatabse = (databaseName) =>{
      String(databaseName);
      var con = mysql.createConnection({
        host: DBdetails.host,
        user: DBdetails.username,
        password: DBdetails.password,
      });
        con.connect(function(err){
            if(err) throw err;
            console.log('Connected');

            con.query('CREATE DATABASE '+ databaseName, function(err, result){
                if(err) {
                    console.log('Database exits or ' + err);
                    return false;
                };

                console.log('Datadase created');
                return true;
            });
        });
     }
      //Form table of the dashboard
    var Table= {
        tablename: keys.mysql.Table.tablename,
        url: keys.mysql.Table.url,
        nameoftable: keys.mysql.Table.nameoftable,
        uniqueID : keys.mysql.Table.uniqueID
    };

var createUserTable = (dbname)=>{
    var con = mysql.createConnection({
        host: DBdetails.host,
        user: DBdetails.username,
        password: DBdetails.password,
        database: dbname
      });
    con.connect(function(err){
        if(err) {console.error(err); return false;};
        console.log('connected');
        var sql = `CREATE TABLE ${Table.tablename} (${Table.url} VARCHAR(255), ${Table.nameoftable} VARCHAR(255), ${Table.uniqueID} VARCHAR(255))`;
        con.query(sql, function(err, result){
            if(err) {console.error(err); return false;};
            console.log('Table created');
            return true;
        });
    });
}

var addToUserTable = (dbname, url, name, id) =>{
    var con = mysql.createConnection({
        host: DBdetails.host,
        user: DBdetails.username,
        password: DBdetails.password,
        database: dbname
      });
      con.connect(function(err, results){
          if (err){
            console.error(err);
            return false ;
          } 
          console.log('Connected');
          var records = [
              [url, name, id]
          ];
          var sql = `INSERT INTO ${Table.tablename} (${Table.url}, ${Table.nameoftable}, ${Table.uniqueID}) VALUES ?`;
          con.query(sql, [records], function(err, result){
              if (err) {
                  console.error(err);
                  return false;
              };
              console.log('Inserted!');
              return true;
          });
      });
}

var getfromtable = (dbname, table, params) =>{
    var dbResults;
    return new Promise(function(resolve, reject){
        var con = mysql.createConnection({
            host: DBdetails.host,
            user: DBdetails.username,
            password: DBdetails.password,
            database: dbname
          });
    
           con.connect(function(err, results){
            if (err) {
                console.error(err);
                return false;
            }
            console.log('Connected');
    
            if(params){
                var sql = `SELECT ${params} FROM  ${table}`;
            }else{
                var sql = `SELECT * FROM  ${table}`;
            }
           
    
            con.query(sql, function(err, result){
                if (err) {
                    console.log(err);
                    reject(con);
                }
                console.log('All selected fields selected!');
                dbResults =  result;
                resolve(dbResults);
            });
        });
    
    })

}
var sayhello = (message) =>{
        return message;
     }

var Datadase = {
    createDatabse: createDatabse,
    createUserTable: createUserTable,
    sayhello: sayhello,
    addToUserTable: addToUserTable,
    getfromtable: getfromtable
};

 module.exports = Datadase; 
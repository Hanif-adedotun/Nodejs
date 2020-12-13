var MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongodb.url;


//function (connect_insert): insert a data into the mongodb atlas database
//@params (database) the name of the database to insert into
//@params (collection) the table to insert data into
//@params (data) the form data to be inserted
var connect_insert = (database, collection, data) =>{
     try{
          MongoClient.connect(url,{
               useNewUrlParser: true,
               useUnifiedTopology: true,
               // useFindAndModify: true,
               // useCreateIndex: true
             },function(err, db) {
            if (err) throw err;
            var dbo = db.db(database);
            
            dbo.collection(collection).insertOne(data, function(err, res) {
              if (err) throw err;
              console.log(`${data.key} is inserted`);
              db.close();
            });
          });
          return true;
     }catch(err){
          console.error(err);
          return false;
     }
}

 //function (connect_insert): get a data into the mongodb atlas database
//@params (database) the name of the database to get data from
//@params (collection) the table to get data from

var connect_find = async (database, collection, keyVal) =>{
     var res;
     return new Promise(function(resolve, reject){
     MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     },async function(err, db) {
          if (err) { reject(MongoClient); throw err;}
          var dbo = db.db(database);
          var query = {key: String(keyVal)};
          await dbo.collection(collection).find(query).toArray(async function(err, result) {
            if (err) {reject(MongoClient); throw err; };
            res = result;
            console.log('Mongodb data from mongodb.js: '+JSON.stringify(result));
            db.close();
            resolve(result);
          });
        });
     });      
}
var mongo ={
     insert : connect_insert,
     find: connect_find
}
module.exports = mongo;
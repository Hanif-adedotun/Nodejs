var MongoClient = require('mongodb').MongoClient;
const { createConnection } = require('mysql');
const keys = require('../config/keys'); 


var uri = keys.mongodb.url;


createcollection = () =>{
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db(keys.mongodb.db.name);
    dbo.createCollection(keys.mongodb.db.collection, function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });

}

var mongo = {
  createCollection: createConnection
}


module.exports = mongo;
var MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys'); 

var uri = keys.mongodb.url;
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
console.log('connected');
  // perform actions on the collection object
  client.close();
});
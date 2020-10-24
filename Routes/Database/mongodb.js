var MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongodb.url;


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
var connect_find = (database, collection) =>{
     var res;
     MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     },async function(err, db) {
          if (err) throw err;
          var dbo = db.db(database);
          var query = {key: '1077891518327029'};
          await dbo.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log('Mongodb: '+result);
            res = result;
            db.close();
          });
        });
        return res;
}
var mongo ={
     insert : connect_insert,
     find: connect_find
}
module.exports = mongo;
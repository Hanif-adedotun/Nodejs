var MongoClient = require('mongodb').MongoClient;
const keys = require('../config/keys');
const url = keys.mongodb.url;

module.exports = connect_insert = (collection, data) =>{
     

     try{
          MongoClient.connect(url,{
               useNewUrlParser: true,
               useUnifiedTopology: true,
               // useFindAndModify: true,
               // useCreateIndex: true
             },function(err, db) {
            if (err) throw err;
            var dbo = db.db(keys.mongodb.db.name);
            
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


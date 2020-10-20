const mongoose = require('mongoose');
const keys = require('../config/keys');

var uri = keys.mongodb.url;

const connectdb = async () => {
     await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true,
          useCreateIndex: true
        });
        console.log('Connected to mongo db');
        // const db = mongoose.connection;
        // db.on('error', console.error.bind(console, 'connection error:'));
        // db.once('open', function() {
        //   // we're connected!
        //   console.log('Connected to db');
        // });
}


// const user = new mongoose.Schema({
//      firstName: String,
//      id: String,
//      email: String
// });


module.exports = connectdb;

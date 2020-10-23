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
}

module.exports = connectdb;

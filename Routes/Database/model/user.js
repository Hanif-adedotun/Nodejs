const mongoose = require('mongoose');

var user = new mongoose.Schema({
     firstName:{
          type: String
     },
     lastName:{
          type:String
     },
     id:{
          type: Number
     }
});

module.exports = user = mongoose.model('User', user);


// var questionSchema = new Schema({
//      sectors: String,
//      Qid: String,
//      Question: String,
//      enabled: Boolean
//    },{collection:'questionPool'});
// var questionModel = mongoose.model('questionModel', questionSchema);
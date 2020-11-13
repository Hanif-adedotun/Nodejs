const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
var usersDB = require('./Database/database');
const keys = require('../Routes/config/keys');
const { json } = require('body-parser');

//MongoDB
const mongo = require('./Database/mongodb')

//Test save to config
const ncon = require('./config/nconfig');

//Random number generator
const crypto = require('crypto');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


// @params {Address} is /api/users

var users = null;
var userImage = null;
var dbname = null;


router.get('/login/dashboard', async (req, res) => {
  var serverRes, usekey;
  //get dashboard from its database

    usekey = await ncon.readFile();

  const dummyTable = {
    databse: (usekey) ? usekey.id : null,
    table: keys.mysql.Table.tablename
  }
  console.log('User id '+ dummyTable.databse);

  if (!dummyTable.databse){
    serverRes = {
      status: 400,
      data: 'Log into databse'
    }
    res.status(404).json(serverRes);
    return;
  }
 
    usersDB.getfromtable(dummyTable.databse, dummyTable.table).then(async function(dbResult){
      
      var tableresult = Object(dbResult);
      const uniqueid = tableresult[0].uniqueid;
      const action_url = `${keys.backend.path}/${dummyTable.databse}/${uniqueid}`;

      //In future the db is the unique id, then the collection is the uniqueId
      
      const UserTable =  await mongo.find(keys.mongodb.db.name, keys.mongodb.db.collection);
      console.log(UserTable);
      
      if(!tableresult){
        console.error('User file not available'+ err);
  
        serverRes = {
          status: 404,
          data: 'Empty database'
        }
        res.status(200).json(serverRes);
      
      }else{
        serverRes = {
          status: 200,
          action_url: action_url,
          data: tableresult,
          table: Object(UserTable)
        }
        res.status(200).json(serverRes);
      }
              

    }).catch(function(err){
      console.log('Fetch retrieval error ' + err);

      serverRes = {
        status: 404,
        data: 'Users Table is empty not found'
      }
      res.status(404).json(serverRes);
    });    
    
});



//If the dashboard is empty
router.route('/generateId').post((req, res) => {

    //This function is to generate a unique id and sends it to the user
    function Generate(){
        let num = crypto.randomBytes(8).toString('hex');
        return num;
    }
    res.json(Generate());
});

//Form validation
router.route('/createDB')
  .post([
    body('htmlUrl', 'Invalid Url').isURL({require_host: false, allow_underscores: true, require_valid_protocol: false}),
    body('dbname', 'Enter a valid Name, must be less than 10 characters').isString().isLength({ max: 10, min: 1}),
    body('uniqueId', 'Id is not a string').isAlphanumeric().isLength({ max: 16, min: 1})
      
    ],function(req, res){
  
      // console.log(req.body.htmlUrl);
  
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {  
          
          var idnum = new Array();
           for (let i = 0; i <  errors.array().length; i++) {
            idnum.push(i);
          }
          // console.log(idnum);
          
          return res.status(400).json({ errors: errors.array() , id: idnum});
        }else{
          if(keys.mysql.database){
            usersDB.addToUserTable(keys.mysql.database, req.body.htmlUrl, req.body.dbname, req.body.uniqueId);
          }
          return res.json({errors: null});
        }
});
  

module.exports = router;
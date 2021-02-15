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
//Using the cryptocurrence hashing method
const crypto = require('crypto');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


// @params {Address} is /api/users

//create empty variables for the users options
// var users = null, userImage = null, dbname = null;

//Router (GET method) {/api/users/login/dashboard}
// To get both the current user details and the user stored form in the mongodb if any
router.get('/login/dashboard', async (req, res) => {
  var serverRes, usekey;
  //get dashboard from its database
    usekey = await ncon.readFile();

    const dummyTable = {
      databse: (usekey) ? usekey.id : null,
      table: keys.mysql.Table.tablename
    }
  
    if(!dummyTable.databse){
      console.log('User id '+ dummyTable.databse);
      serverRes = {
        status: 400,
        data: 'Log into databse'
      }
      res.status(404).json(serverRes)
    }

 
    usersDB.getfromtable(keys.mysql.database, dummyTable.table,` WHERE ${keys.mysql.Table.userID} ='${dummyTable.databse}'`).then(async function(dbResult){
      
      var tableresult = await Object(dbResult);
      
      console.log('Test table '+JSON.stringify(tableresult));

      if(!tableresult[0]){
        console.error('User file not available');
  
        serverRes = {
          status: 404,
          data: 'Empty database'
        }
        res.status(404).json(serverRes);
      return;
      }

      const uniqueid = tableresult[0].uniqueid;
      const action_url = `${keys.backend.path}/${dummyTable.databse}/${uniqueid}`;

      
      await mongo.find(keys.mongodb.db.name, keys.mongodb.db.collection, uniqueid).then(db_res => {    
      // console.log(uniqueid);
      // console.log('Testing data from users.js :'+db_res[0].key);
     
        serverRes = {
          status: 200,
          action_url: action_url,
          data: tableresult,
          table: db_res
        }
        res.status(200).json(serverRes);
    });          

    }).catch(function(err){
      console.log('Fetch retrieval error ' + err);

      serverRes = {
        status: 500,
        data: 'Server Error'
      }
      res.status(500).json(serverRes);
    });    
    
});

//Router (GET method) {/api/users/delete/:id}
//:id is the id of the file to delete form mongodb
// To delete a field from the table in Mongodb 
router.route('/delete/:id').delete( async (req, res) =>{

var resp;
    await mongo.delete(keys.mongodb.db.name, keys.mongodb.db.collection, req.params.id).then(del => {
      resp = {
        code: 200,
        deleted: true,
      }
      res.status(200).json(resp);

    }).catch(function(err){
      resp = {
        code: 500,
        deleted: false,
      }
      console.log(err);
      res.status(500).json(resp);
    })
        
})


//Router (GET method) {/api/users/generateId}
// To generate a 8 character string  containing number and letters to whcich whill be used in the unique link to secure the frontend form
router.route('/generateId').get((req, res) => {
    //This function is to generate a unique id and sends it to the user
    //{return} num as a string
    function Generate(){
        let num = crypto.randomBytes(8).toString('hex');
        return num;
    }
    res.json(Generate());
});

//Router (POST method) {/api/users/createDB}
//This api is to parse the data of the form when creating a new table 
//Using the express validator package
//Returns a list of errors if there are errors or null if they are not
router.route('/createDB')
  .post([
    body('htmlUrl', 'Invalid Url').isURL({ protocols: ['http','https'] , allow_protocol_relative_urls: true, require_host: false, allow_underscores: true, require_valid_protocol: true, require_port: false, require_protocol: false}),
    body('dbname', 'Enter a valid Name, must be less than 10 characters').isString().isLength({ max: 10, min: 1}),
    body('uniqueId', 'Id is not alphanumeric').isAlphanumeric().isLength({ max: 16, min: 1})
      
    ],async function(req, res){
  
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
          try {

            var usekey = await ncon.readFile();
            const Table = {
              databse: (usekey) ? usekey.id : null
            }
            if(Table.databse){
              usersDB.addToUserTable(keys.mysql.database, req.body.htmlUrl, req.body.dbname, req.body.uniqueId, Table.databse);
            }
            return res.status(200).json({errors: null});

          } catch (error) {

            console.log('Error adding to database:'+error);
            return res.status(500).json(null);

          }
         
        }
});

//Router (POST method) {/api/users/createDB}
router.route('/editVal').post(
[
  body('inputUrl', 'Invalid Url value').isURL({ protocols: ['http','https'] , allow_protocol_relative_urls: true, require_host: false, allow_underscores: true, require_valid_protocol: true, require_port: false, require_protocol: false})

], async function(req, res){
  const errors = validationResult(req);
        
        if (!errors.isEmpty()) {  
          
          var idnum = new Array();
           for (let i = 1; i <=  errors.array().length; i++) {
            idnum.push(i);
          }
          
          return res.status(400).json({ errors: errors.array() , id: idnum});
        }else{
          try{
              //Code to tell Mysql to edit value
              return res.status(200).json({errors: null});

          }catch(error){
            console.log('Error editing value:'+error);
            return res.status(500).json(null);
          }
        }
});
  

module.exports = router;
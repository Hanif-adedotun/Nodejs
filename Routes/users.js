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
 
    usersDB.getfromtable(keys.mysql.database, dummyTable.table,` WHERE ${keys.mysql.Table.userID} ='${dummyTable.databse}'`).then(async function(dbResult){
      
      var tableresult = Object(dbResult);
      const uniqueid = tableresult[0].uniqueid;
      const action_url = `${keys.backend.path}/${dummyTable.databse}/${uniqueid}`;


      // Temporary key value to test the retrieval of data from atlas
      // const tempkey = '1077891518327029';

      
      await mongo.find(keys.mongodb.db.name, keys.mongodb.db.collection, uniqueid).then(db_res => {    
      // console.log(uniqueid);
      console.log('Testing data from users.js :'+db_res[0].key);
     
      
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
          table: db_res
        
        }
        res.status(200).json(serverRes);
      }
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

// To delete a field from the table
router.route('/delete/:id').delete( async (req, res) =>{
//delete the user 
var resp;
    await mongo.delete(keys.mongodb.db.name, keys.mongodb.db.collection, req.params.id).then(del => {
      resp = {
        code: 200,
        deleted: res,
      }
    }).catch(function(err){
      resp = {
        code: 500,
        deleted: 'Internal Server Error',
      }
      res.status(500).json(serverRes);
    })
        var resp = {
          code: 200,
          message: `You tried to delete data `+req.params.id,
        }
          if(resp.code){
            res.status(200).json(resp);
          }
})


//If the dashboard is empty
router.route('/generateId').post((req, res) => {

    //This function is to generate a unique id and sends it to the user
    function Generate(){
        let num = crypto.randomBytes(8).toString('hex');
        return num;
    }
    res.json(Generate());
});

//Form validation when creating a new table
router.route('/createDB')
  .post([
    body('htmlUrl', 'Invalid Url').isString(),//isURL({ protocols: ['http','https'] , allow_protocol_relative_urls: true, require_host: false, allow_underscores: true, require_valid_protocol: true, require_port: false, require_protocol: false})
    body('dbname', 'Enter a valid Name, must be less than 10 characters').isString().isLength({ max: 10, min: 1}),
    body('uniqueId', 'Id is not a string').isAlphanumeric().isLength({ max: 16, min: 1})
      
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
            return res.json({errors: null});

          } catch (error) {

            console.log('Error adding to database:'+error);
            return res.status(500).json(null);

          }
         
        }
});

  

module.exports = router;
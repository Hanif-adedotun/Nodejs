const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
var usersDB = require('./Database/database');
const keys = require('../Routes/config/keys');
const { json } = require('body-parser');


// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


// @params {Address} is /api/users

var users = null;
var userImage = null;
var dbname = null;


router.route('/login')

.post((req, res) => {
  console.log(req.body);
  if(req.body){
    users = req.body;
    userImage = req.body.imageUrl;
    dbname = req.body.googleId;
    usersDB.createDatabse(dbname);
   // createuserTable(databaseName, Tablename(req.body.googleId), req.body.name, req.body.email);
  }else{
    users = null;
    userImage = null;
  }  
  // res.json(req.body);
})
  .get((req, res) => {
  if(users){
    res.status(200).json(users);
  }else{
    res.status(404).send('User not found');
    // console.log(user);
  }
});

router.get('/login/image', (req, res) => {//Get login image for navigation to show
  if(userImage){
    // console.log(userImage);
    res.status(200).json(userImage);
  }else{
    res.status(404).send('Image not found');
    // console.log(user);
  }
});

router.get('/login/dashboard', (req, res) => {
  var serverRes;
  //get dashboard from its database
  // var tableresult = usersDB.getfromtable(dbname);
  const dummyTable = {
    databse: keys.mysql.database,
    table: keys.mysql.Table.tablename
  }

  usersDB.getfromtable(dummyTable.databse, dummyTable.table).then(function(dbResult){
    
    var tableresult = Object(dbResult);
    const uniqueid = tableresult[0].uniqueid;
    const action_url = `${keys.backend.path}/${dummyTable.databse}/${uniqueid}`
    
    if (!dummyTable.databse || !tableresult ){
      serverRes = {
        status: 400,
        data: 'Log into databse'
      }
      res.status(404).json(serverRes);
    }else{
      serverRes = {
        status: 200,
        action_url: action_url,
        data: tableresult
      }
      res.status(200).json(serverRes);
    }
    

  }).catch(function(err){
    console.log('Error' + err);

    serverRes = {
      status: 404,
      data: 'Users Table is empty not found'
    }
    res.status(404).json(serverRes);
  });
  
    
});

router.route('/generateId').post((req, res) => {

    //This function is to generate a unique id and sends it to the user
    function Generate(){
        //This function is to generate a modlular exponential of the numbers
        //@params base {number}
        //@params exponent {number}
        //@params modulus {number}
        function ModularExp(base, exponent, modulus){
            if (modulus === 1) return 0;
            var value = 1;
            for(let i = 0; i< exponent; i++){
                value = (value * base) % modulus;
            }
            return Number(value);
        }

        //This function is to convert the ModularExp number to a random 16 characters string
        //@params number {number} is the returned value from the ModularExp algorithm
        function convertTo16chars(number){
            var uniqueid = String(number);
            for(let i=0; i < 16; i++){
                uniqueid += Math.ceil(Math.random() * 10 * i*i);
            }
            return uniqueid.slice(0, 16);//encodes to base64, and slices to a 16 character string
        }
        let id = convertTo16chars(ModularExp(Math.round(Math.random()*10), Math.round(Math.random()*10), Math.round(Math.random()*10)));
        return id;
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
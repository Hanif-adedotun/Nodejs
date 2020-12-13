const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');
const util = require('util');

const keys = require('./config/keys');
var DB = require('./Database/database');
const { json } = require('body-parser');
var path = require('path');
const querystring = require('querystring');
const formidableMiddleware = require('express-formidable');

//mongodb
const mongo = require('./Database/mongodb');

// support parsing of application/json type post data
router.use(bodyParser.json());



//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


// @params {Address} is /api/middlewear/data
var dummyTable = {
    databse: keys.mysql.database,
    table: keys.mysql.Table.tablename,
    key: keys.mysql.Table.uniqueID,
    url: keys.mysql.Table.url
  }


//To post the results to the database from the users form backend_page
//@params(dbname) is the 
router.route('/:dbname/:key').get((req, res) =>{
    // res.send('Hello database');
}).post((req, res) =>{
    req.setMaxListeners(5);
    
    const params = ` WHERE ${keys.mysql.Table.userID} ='${req.params.dbname}'`
    DB.getfromtable(dummyTable.databse, dummyTable.table, params).then(
        function(result){

            const key = result[0].uniqueid;
            const url = result[0].url;
           
            // console.log('Expected inputs were: ' + key + ' ' + url);
            // console.log('Given inputs were: ' + req.params.key + ' ' + req.headers.origin);
            if(req.params.key === key && req.headers.referer === url){
                //if the query parameters are safe and confirmed send a page to show loading 
                res.status(200).sendFile(path.join(__dirname +'/config/backend_page.html'));
                var tablres = {
                    // Temporary key to test the mongodb function
                    key:  '1077891518327029', //key,
                    db_values: []                    
                };
                
                switch(req.headers["content-type"]){
                    default: parsedata(req.body);
                    break;
                    case "application/x-www-form-urlencoded": parsedata(req.body, true);
                    break;
                    case "multipart/form-data": parsemult(req.body);
                    break;
                    case "text/plain": parsedata(req.body);//check for how to parse text/plain data
                    break;
                }

                //If files are included in the data sent use a different middleware
                function parsemult(){
                    router.use(formidableMiddleware({
                        encoding: 'utf-8',
                        uploadDir: '/my/dir',
                        multiples: true,
                    }));
                        console.log(req.fields);
                        console.log(req.files);
                }
                
                //If it is just plain text use a normal data
                async function parsedata(data, type){
                    if(type){
                        querystring.parse(data);
                    }
                   
                    try{
                        
                        for (var field in data){
                        
                            if(field !== ('submit' || 'Submit' || 'send' || 'Send')){
                               
                            tablres.db_values[field] = data[field];
                        
                            //collection is the google id
                            }              
                        }
                        console.log(tablres);

                        //Insert the data into the database
                        //mongo.insert(name of database, name of collection, data to insert)
                        await mongo.insert(keys.mongodb.db.name, keys.mongodb.db.collection, tablres);
                        
                        var backURL = req.header('Referer') || '/';
                        res.redirect(backURL);
                           
                    }catch(err){
                        res.status(500).send('<h1>We are having problems right now! Please try again later. Thank you</h1>');
                    }
                    
                    //   res.redirect('http://localhost/Test/index.html');
                }
                
            }else{
                res.status(404).send('<h1>404.</h1>Either Key is incorrect or this is not the expected Url, Try again or sign up our <a href="http://localhost:3000/profile">website</a>. <p>Incorrect key: '+ +req.params.key+' Incorrect Url: '+JSON.stringify(req.headers.referer)+'</p>');
            }

    }).catch(function(err){
    console.log('Error: ' + err);

    var serverRes = {
      status: 404,
      data: 'Internal server error!'
    }
    res.status(500).send(JSON.stringify(serverRes.data));
    });
    
});

module.exports = router;
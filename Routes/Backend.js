const express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const url = require('url');
const util = require('util');
// const querystring = require('querystring');
// const { body, validationResult } = require('express-validator');
// const cors = require('cors');
const keys = require('./config/keys');
var DB = require('./Database/database');
const { json } = require('body-parser');
var path = require('path');
const querystring = require('querystring');
const formidableMiddleware = require('express-formidable');


// support parsing of application/json type post data
router.use(bodyParser.json());



//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


// @params {Address} is /api/middlwear/backend
var dummyTable = {
    databse: keys.mysql.database,
    table: keys.mysql.Table.tablename,
    key: keys.mysql.Table.uniqueID,
    url: keys.mysql.Table.url
  }

router.route('/:dbname/:key').get((req, res) =>{
    res.send('Hello database');
}).post((req, res) =>{
    req.setMaxListeners(5);
    // var data = {
    //     referer: req.headers.referer,
    //     origin: req.headers.origin,
    //     rew: req.originalUrl,
    //     body: req.body,
    //     headers: req.headers,
    //     url: req.url,
    //     user: req.user,
    //     xhr: req.xhr,
    //     subdomains: req.subdomains,
    //     secure: req.secure,
    //     session: req.session,
    //     options: req.sessionOptions,
    //     path: req.path,
    //     params: req.params,
    //     ip: req.ip,
    //     hostname: req.hostname
    // };

    const params = dummyTable.key+','+dummyTable.url;
    DB.getfromtable(req.params.dbname, dummyTable.table, params).then(
        function(result){

            const key = result[0].uniqueid;
            const url = result[0].url;
           

            if(req.params.key === key && req.headers.origin === url){
                res.status(200).sendFile(path.join(__dirname +'/config/backend_page.html'));
                var tablres = {
                    head: [],
                    body: []
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

                
                function parsemult(){
                    router.use(formidableMiddleware({
                        encoding: 'utf-8',
                        uploadDir: '/my/dir',
                        multiples: true,
                    }));
                        console.log(req.fields);
                        console.log(req.files);
                        //after adding to databsse
                        res.redirect('back');
                }
                

                function parsedata(data, type){
                    if(type){
                        querystring.parse(data);
                    }
                    
                    for (var field in data){
                        if(field !== 'submit' || field !== 'Submit'){
                            tablres.head += field;
                            tablres.body += data[field];
                        }
                        console.log('Key: ' + field);
                        console.log('Value: '+ data[field]);
                    }
                      //after adding to databsse
                      
                    //   res.redirect('http://localhost/Test/index.html');
                }
                

            }else{
                res.status(404).send('<h1>404.</h1>Either Key is incorrect or this is not the expected Url, Try again or sign up our website. <p>Incorrect key: '+ +req.params.key+' Incorrect Url: '+JSON.stringify(req.headers.referer)+'</p>');
            }

    }).catch(function(err){
    console.log('Error: ' + err);

    var serverRes = {
      status: 404,
      data: 'Unauthorized access!'
    }
    res.status(401).send(JSON.stringify(serverRes.data));
    });
    
});

module.exports = router;
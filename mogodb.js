//Mongo DB
var mongodb = require('mongodb');
var db = new mongodb().getDB("playground");

db.employees.insert({name: {first: 'John', last: 'Doe'}, age: 44});
var nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();

async function  save(key, value) {
     nconf.set(key, value);

     await nconf.save(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('Configuration saved successfully.');
    });
}

// console.log(nconf.get('dessert'));

var ncon ={
     save: save
}
module.exports = ncon;

// Clean up and learn how to use this package

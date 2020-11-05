var fs = require('fs');
var file = './config.json';


async function writeFile(dataSent){
  var data = JSON.stringify(dataSent);
  
await fs.writeFile(file, data, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});
}
// console.log(nconf.get('dessert'));
async function readfil(){
   var data = await fs.readFileSync(file),
    myObj;

  try {
    myObj = JSON.parse(data);
    // console.dir(myObj);
    return myObj;
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
    return null;
  }
}

async function refreshfile(){
  await fs.unlink(file, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log('Deleted the file');
}

var ncon ={
    //  save: save,
     fs: {
      writeFile: writeFile,
      readFile: readfil,
      refresh: refreshfile
     }
    
}

module.exports = ncon.fs;

// Clean up and learn how to use this package

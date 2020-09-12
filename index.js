var fs = require('fs');

fs.open('info.txt', 'r', 
    function(err, handle){
        if(err){
            console.log("Error: "+ err.code + ' '+ err.message);
            return;
        }
        var buff = new Buffer.alloc(100000);
        fs.read(
            handle, buff, 0, 100000, null,
            function(err, length){
                if(err){
                    console.log("Error: "+ err.code + ' '+ err.message);
                    return;
                }
            console.log(buff.toString('utf8'), 0, length);
            fs.close(handle, function(){ /*Code*/});
            }
        );
    }
);
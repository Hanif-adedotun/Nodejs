var http = require('http');
var fs = require('fs');

function load_album(callback){
    fs.readdir('albums',
        function (err, files){
            if(err){
                callback(err);
                return;
            }
            callback(null, files);
        }
    );
}


function handle_request(req, res){
    console.log('Incoming Request: '+ req.method + ' ' + req.url);
    
    load_album(function(err, albums){
        if(err){
            res.writeHead(503, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(err) + "\n");
            return;
        }
        var out = {error: null,
                    data: {albums: albums}};

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(out) + "\n");
    });
}

var server = http.createServer(handle_request);
server.listen(8080);
console.log('Server Listening at localhost:8080');
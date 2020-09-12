var http = require('http');
var util = require('util');
var url = require('url');
var os = require('os');

http.createServer(function(request, result){
var requrl = url.parse(request.url, true);

    if(requrl.pathname === '/'){
        result.writeHead(200, {'Content-Type': 'texthtml'});
        result.end(
            "<html><head><title>Hanif Node.js</title></head>"+
            "<body><h1>Hello, Nodejs</h1><p><a href='osinfo'>OS Info</a></p></body></html>"
            );
    }else if(requrl.pathname === "/osinfo"){
        result.writeHead(200, {'Content-Type': 'texthtml'});
        result.end(
            "<html><head><title>Hanif Node.js</title></head>"+
            "<body><h1>OPerating System Info</h1>"+
            "<table><tr><th>TMP Dir</th><td>" + os.tmpdir() +"</td></tr><tr><th>OS Type</th><td>" + os.type()  + os.platform() + os.arch()+ os.release()+ "</td></tr><tr><th>Host Name</th><td>" + os.hostname() + "</td></tr><tr><th>CPU's</th><td><pre>"+ util.inspect(os.cpus())+ "</pre></td></tr><tr><th>Network</th><td><pre>"+ util.inspect(os.networkInterfaces()) +"</table>"+
            "</body></html>"
        );
    }else{
        result.writeHead(404, {'Content-Type': 'text/plain'});
        result.end('Bad URL '+ request.url + ' ' + requrl.pathname);
    }
}).listen(8888);
console.log('Listening at Localhost:8888');

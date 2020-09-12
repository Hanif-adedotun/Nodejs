
// var http = require('http');
// fs = require('fs');

// fs.readFile('test-node.html', function(err, html){
//         if (err){
//             throw err;
//         }
//     http.createServer(function(request, response){
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write(html);
//         response.end();
//     }).listen(8124, "127.0.0.1");
// });
const server = http.createServer(function(req, res) {
    if(req.method === 'GET' && req.url === '/favicon.ico') {
    const fs = require('fs');
    fs.createReadStream('favicon.ico');
    fs.pipe(res); // this replaces the call to 'end'
    } else {
    console.log('${req.method} ${req.url}');
    res.end('Hello world!');
    }
    });

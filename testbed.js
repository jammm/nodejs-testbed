// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    http = require('http'),
    fs = require('fs');
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}
else {
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  if(request.url == '/hello')
  {
    response.end("Hello World!!!\n");
  }
  else if(request.url.match(/^\/delay/))
  {
      delay = request.url.match(/^\/delay\/(.+)/);
      if (delay) delay = delay[1]
      setTimeout(function() {
        response.end('Hello World!!! This is a delayed response\n');
      }, (delay ? parseInt(delay, 10) : 200))
  }
});

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");
}

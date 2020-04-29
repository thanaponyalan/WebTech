var http=require(`http`);

http.createServer(function(request,response){
    `use strict`;
    response.writeHead(200,{"content-type":"text/html"});
    response.end(`<h2>Example 5.1<br>Hello World! in Node.js</h2>`)
}).listen(8080);

console.log(`Server running on 8080`);
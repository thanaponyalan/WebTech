var http=require(`http`);

function onRequest(request,response){
    `use strict`;
    response.writeHead(200,{"content-type":"text/html"});
    response.write(`<h2>Refactoring the Example 5.1<br>Hello World! in Node.js</h2>`);
    response.end();
}

http.createServer(onRequest).listen(8080);
console.log(`Server running on 8080`);
var http=require(`http`);
function start(){
    `use strict`;
    function onRequest(request,response){
        console.log(`Request received`);
        response.writeHead(200,{"content-type":"text/html"});
        response.write(`<h2>Example 5.5<br>Create a module named server.js</h2>`);
        response.end();
    }
    http.createServer(onRequest).listen(8080);
    console.log(`Server has started on port 8080`);
}

exports.start=start;
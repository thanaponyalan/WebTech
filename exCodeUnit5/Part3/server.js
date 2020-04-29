var http=require(`http`),
    url=require(`url`);

function start(route, handle){
    `use strict`;
    function onRequest(request, response){
        var pathname=url.parse(request.url).pathname;
        console.log(`Server Module : Request for ${pathname} received.`);
        route(handle, pathname, response);
    }
    http.createServer(onRequest).listen(8080);
    console.log(`Server has started on 8080`);
}

exports.start=start;
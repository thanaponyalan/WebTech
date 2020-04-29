function route(handle, pathname, response){
    `use strict`;
    console.log(`Router Module : Route a request for ${pathname}`);
    if(typeof handle[pathname]===`function`){
        return handle[pathname](response);
    }else{
        console.log(`No request handler found for ${pathname}`);
        response.writeHead(404,{"content-type":"text/plain"});
        response.write(`404 Not found`);
        response.end();
    }
}
exports.route=route;
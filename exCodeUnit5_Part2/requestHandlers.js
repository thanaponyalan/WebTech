function start(response){
    `use strict`;
    console.log(`Request handler "start" was called`);
    response.writeHead(200,{"content-type":"text/plain"});
    response.write(`Hello Start`);
    response.end();
}

function upload(response){
    `use strict`;
    console.log(`Request handler "upload" was called`);
    response.writeHead(200,{"content-type":"text/plain"});
    response.write(`Hello Upload`);
    response.end();
}

exports.start=start;
exports.upload=upload;
var formidable=require(`formidable`),
    fs=require(`fs`);
function start(response){
    `use strict`;
    console.log(`Request handler "start" was called`);
    var body=
        `<!DOCTYPE html>`+
        `<html>`+
            `<head>`+
                `<meta charset="utf-8">`+
                `<title>An example of Node.js Web Application</title>`+
            `</head>`+
            `<body>`+
                `<header>PicUL Web Application</header>`+
                `<form action="/upload" enctype="multipart/form-data" method="post">`+
                    `<p><input type="file" name="upload" multiple="multiple"></p>`+
                    `<p><input type="submit" value="Upload image"></p>`+
                `</form>`+
            `</body>`+
        `</html>`;
    response.writeHead(200,{"content-type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    `use strict`;
    console.log(`Request handler "upload" was called`);
    const form=new formidable({multiples: false});
    form.parse(request,(error, fields,files)=>{
        console.log(`Parsing done`);
        fs.rename(files.upload.path,`/tmp/test.png`,function(error){
            if(error){
                fs.unlink(`/tmp/test.png`);
                fs.rename(files.upload.path, `/tmp/test.png`);
            }
        });
        response.writeHead(200,{"content-type":"text/html"});
        response.write(`Received image :<br>`);
        response.write(`<img src="/show">`);
        response.write(`<p><a href="/">Back to Home page</a></p>`);
        response.end();
    });
}

function show(response){
    `use strict`;
    console.log(`Request handler "show" was called.`);
    response.writeHead(200,{"content-type":"image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start=start;
exports.upload=upload;
exports.show=show;
let http = require('http');
let fs = require('fs');
let path = require('path');

const ip = '127.0.0.1';
const port = 3000;


http.createServer(function(request, response){

    console.log('request: ', request);
    let file = '.'+ request.url;
    if(file == './')file = './index.html';
    let extension = String(path.extname(file)).toLowerCase();
    let mime = { '.html': 'text/html','.js': 'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpg','.jpeg':'image/jpeg','.gif':'image/gif'}
    let type = mime[extension] || 'application/octet-stream';


    fs.readFile(file, function(error, content){
        if(error){
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content){
                    response.writeHead(200,{'Content-Type': type });
                    response.end(content,'utf-8');
                });
            
            }else{
                response.writeHead(500);
                response.end('Error:'+ error.code + '\n');
                response.end();
            }
        }else{
            response.writeHead(200, {'Content-Type': type});
            response.end(content, 'utf-8');
        }
    });




}).listen(port, ip);

console.log("Running at "+ ip + ':'+ port +"\n")

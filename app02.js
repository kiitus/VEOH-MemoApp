const http = require('http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log('Http pyynti saatu, url ' + url + 'method ' + method);
    //'Http pyynti saatu, url ${url} method ${method} 


})

server.listen(8080);
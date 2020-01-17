const http = require('http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log('Http pyynti saatu, url ' + url + 'method ' + method);
    //'Http pyynti saatu, url ${url} method ${method} 

    if(url === '/')
    {
        res.write(`
        <html>
        <head><title>MemoApp</title></head>
        <body>
            <form action="add-note" method ="POST">
            <input type="text" name="note">
                <button type="submit">Add note</button>
            </form>
        </body>
        </html>
        `);
        res.statusCode = 200;  //OK
        res.end();

        return;
    }
    console.log(`${url} ei löydy`);
    res.write(`
        <html>
        <head><title>MemoApp - 404</title></head>
        <body>
           <h1>404 - sivua ei löytynyt</h1> 
        </body>
        </html>
        `);
        res.statusCode = 404;  //Not found
        res.end();
})

server.listen(8080);
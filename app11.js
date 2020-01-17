const http = require('http');
const fs = require('fs');

//Pull testi


const notes = [];
//testi

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log('Http pyynti saatu, url ' + url + ' method ' + method);
    //'Http pyynti saatu, url ${url} method ${method} 

    if(url === '/')
    {
        res.write(`
        <html>
        <head><title>MemoApp</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css"></head>
        <body>`);


        notes.forEach( (value,index) => {
            res.write(`<div>note:${value},index: ${index}`);
            res.write(`<form action="delete-note" method = "POST">
            <input type="hidden" name="index"value="${index}">
            <button type="submit" class="delete_button">Delete</button>
            </form><div>`);
            
        
        });
        

         res.write(`   <form action="add-note" method = "POST">
            <input type="text" name="note">
                <button type="submit" class="add_button">Add note</button>
            </form>
        </body>
        </html>
        `);
        res.statusCode = 200;  //OK
        res.end();


        return;
    }

    else if(url === `/add-note`)
    {
        console.log(`/add-note`);
        const chunks = [];  //selaimen lähettämä data
        req.on('data', (chunk)=> 
        {chunks.push(chunk)});

        req.on('end',()=>{
            const body = Buffer.concat(chunks).toString();
            const decoded_body = decodeURIComponent(body);  //EI TOIMI   tekee ääkkösistä toimivat
            const note = decoded_body.split('=')[1];  //Note=viesi   
           notes.push(note);
          //  console.log(body);
            res.setHeader('Location','/');
            res.statusCode= 303;  //See other? (Redirect)
            res.end();
        });
        return;


    }

    else if(url == '/delete-note')
    {
        console.log("Poistetaan");
    
        let chunks = [];
        req.on('data', (chunk)=> 
        {chunks.push(chunk)});

        req.on('end',()=>{
            const body = Buffer.concat(chunks).toString();
            const index = body.split('=')[1];  //indexi="numero"
           notes.splice(index, 1);
        

        res.setHeader('Location','/');
        res.statusCode= 303;  //See other? (Redirect)
        res.end();  
        });     
        return;
    }
    else if(url === `/favicon.ico`)
    {
        fs.readFile('./favicon.ico', (err,data)=>
        {
            res.write(data);
            res.end();
        });
        return;
    }
    else if(url === `/style.css`)
    {
        fs.readFile('./style.css', (err,data)=>
        {
            res.write(data);
            res.end();
        });
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

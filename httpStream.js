const { createServer } = require('http');
const { createReadStream, write } = require('fs');

const readStream = createReadStream("orgVid.mp4");

const server = createServer((req,res)=>{
    res.writeHead(200,{
         "content-type":"video/mp4",
    })
  readStream.pipe(res);     
})

server.listen(3001,(req,res)=>{
    console.log('HI')
})
const fs = require('fs/promises');


(async()=>{
    const fileRead = await fs.open('another.txt','r');
    const fileWrite = await fs.open('newAnother.txt','w');
    
    const readStream = fileRead.createReadStream();
    const writeStream = fileWrite.createWriteStream();
    
    readStream.on('data',chunk=>{
        if(!writeStream.write(chunk)){
            readStream.pause();
        }
    })
    
    writeStream.on('drain',()=>{
        readStream.resume();
    })
})()


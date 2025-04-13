const fs = require('fs/promises');
const {Buffer} = require('buffer');
(async()=>{
    console.time("writeFile");
    const fileHandle = await fs.open("another.txt","w");
    const stream  = fileHandle.createWriteStream();

    let i = 0;

    function writeMore(){
        while(i<5000000){
            if(i == 5000000 - 1){
                return stream.end()
            }
            const buffer = Buffer.from(`${i} `);
            
            if(!stream.write(buffer)){
                
                console.log(stream.writableLength,i);
                break;
            }
            i++;

        }
    }
    writeMore()
    let c = 0
    stream.on('drain',()=>{
        c++;
        writeMore();
    })
    stream.on("finish",async()=>{
        console.timeEnd("writeFile");
        await fileHandle.close();
        console.log(c)
    })

/*     console.log(stream.writableHighWaterMark) 
        for(let i = 0;i<5;i++){
            const buffer = Buffer.from(`${i} `)
            stream.write(buffer);
        } */
    
})()
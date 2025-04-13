const fs = require('fs/promises');

(async()=>{
    async function createFile (fileName){
        try{
            const existingFile = await fs.open(fileName,'r');
            console("file is alread present");
            await existingFile.close();
        }
        catch(e){
            const newFile = await fs.open(fileName,'w')
            console.log("file created");
            await newFile.close();
        }
    }
    const content =  fs.watch("./text.txt");
    const fileOpen = await fs.open("./text.txt");
    const CREATE_FILE = "create a file"; 
    fileOpen.on("change",async()=>{
        const fileSta = await fileOpen.stat()
        const size = fileSta.size;
        const buff = Buffer.alloc(size);
        const contentBuff = await fileOpen.read(buff,0,size,0);
        const buffContent = buff.toString()
        if (buffContent.includes(CREATE_FILE)){
            await createFile(buffContent.substring(CREATE_FILE.length+1))
        }
    
    })
    for await(let c of content){
        fileOpen.emit("change",c)
    }
    await fs.close("./text.txt");
})()
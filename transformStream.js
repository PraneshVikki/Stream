const { Transform } = require('stream');
const fs = require('fs');

const fileRead = fs.createReadStream('text.txt');
const fileWrite = fs.createWriteStream('another.txt');

class ReplaceNode extends Transform{
    constructor(){
        super();
    }
    _transform(chunk,encode,callback){
        console.log(chunk.toString().length);
        let index = chunk.toString().indexOf('node');
        while(index !== -1){
            chunk = chunk.toString().split("").toSpliced(index,4,'javascript'.split()).join("");
            index = chunk.toString().indexOf('node');
        }
        this.push(chunk)
        
        callback();
    }
    _flush(callback){
        console.log('Stream is about to end, performing final operations.');
        callback();
    }
}

const replaceNode = new ReplaceNode();
fileRead.pipe(replaceNode).pipe(fileWrite);
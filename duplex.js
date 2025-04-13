const { Duplex,PassThrough } = require('stream');
const fs = require('fs');

const fileRead = fs.createReadStream('text.txt');
const fileWrite = fs.createWriteStream('another.txt');

class Throttle extends Duplex{
    constructor(){
        super();
    }
    _read(){
    }
    _write(chunk,encoding,callback){
        this.push(chunk.toString().toUpperCase());
        callback(null)
    }
    _final(){
        this.push(null)
    }
}

const report = new PassThrough();
const throttle = new Throttle();

fileRead.pipe(throttle).pipe(report).pipe(fileWrite) 

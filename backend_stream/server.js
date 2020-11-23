const { Socket } = require("socket.io");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require('fs');

PORT = 3016;
let currentUsers = 0;

io.on("connection", socket =>{
    console.log("connection");
    currentUsers ++;

    socket.on("getStream", _name =>{
        let x = streamlist.streams.find(record => record.name == _name)
        socket.emit("setStream",x);
    });

    socket.on("getStreamList",()=>{
        socket.emit("setStreamList",streamlist);
    })
});

function loadStreamListFromFile(){
    try{
        if (fs.existsSync('streams.json')){
    
        }else{
            fs.copyFileSync('streams.json.standard', 'streams.json');
        }
    }catch(err){
        console.error(err);
    }
    let raw = fs.readFileSync('streams.json');
    let streamlist = JSON.parse(raw);
    return streamlist;
};


let streamlist = loadStreamListFromFile();
console.log(streamlist);


http.listen(PORT,()=>{
    console.log("Listening on Port %s", PORT)

});
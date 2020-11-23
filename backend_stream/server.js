const { Socket } = require("socket.io");

const app = require("express")();

const http = require("http").Server(app);

const io = require("socket.io")(http);

PORT = 3016;

let currentUsers = 0;

STREAMCOMMON = "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"

io.on("connection", socket =>{
    console.log("connection");
    currentUsers ++;

    socket.on("getStream", name =>{
        socket.emit("setStream", STREAMCOMMON);
        //todo Add logic to select right server/stream
    });
});

http.listen(PORT,()=>{
    console.log("Listening on Port %s", PORT)
});
const { Socket } = require("socket.io");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    cors: {
            origin:"*",
    }
});
const fs = require('fs');

//used names for Socket connection

//Socket Events
const CONNECT = 'connection';
const DISCONNECT = 'disconnect';

//Stream Overview
const GETSTREAMLIST = 'getStreamList'; // from Client, get a List of currently planed Streams
const SETSTREAMLIST = 'setStreamList'; // to Client, send a List of currently planned Streams

//Room logic
const JOINROOM = 'joinRoom'; //from Client, wants to join a StreamRoom
const LEAVEROOM = 'leaveRoom'; //from Client, wants to leave a StreamRoom

const UPDATEINFO = 'roomInfo'; //to Client, list of current StreamInformations

const STARTSTREAM = 'startStream'; //to Client, new Stream URL
const LOADOLDMSG = 'loadOldMsg'; // to Client, send all old Messages of the current room
const GOTNEWMESSAGE = 'chatMsg'; // from Client, wants to send a message
const SENDNEWMESSAGE = 'msg'; // to Client, send single new message


const { argv } = require("process");
const { StreamRoom } = require("./utils/rooms");

const botName = "ChatBot"
const PORT = 3714 || process.env.PORT;


//load Streams 
const streamRooms = []; 
let dailyMsg = "tja, hat wohl nicht ordentlich geladen";
loadStreamListFromFile();
console.log(streamRooms);

//start the Server
http.listen(PORT, ()=> console.log(`Server running on port  ${PORT}`));

//run when client connect
io.on('connection', socket =>{

    socket.on(GETSTREAMLIST, ()=>{
        socket.emit(SETSTREAMLIST,streamlist);
    });



    //join room
    socket.on(JOINROOM, ({userX, room}) => {
        try{
            streamRoom = streamRooms.filter(e => e.name = room);
            streamRoom.userJoin(socket, userX);
        }catch (e){
            console.warn("error while joining a room : " + e);
        }
    });

    //listen for msg and broadcast them to the current room
    socket.on(GOTNEWMESSAGE, (msg)=>{
        try{
            user = getUserBySocket(socket);
            streamRoom = streamRooms.filter(e => e.name == user.room)
            streamRoom.addMsg(user.name, msg);
        }catch(e){
            console.warn("error while sending message : " + e);
        }
    });

    //manuell leaving a room
    socket.on('leaveRoom', ()=>{
        leaveRoom(socket)
    });

    //run when client disconnect
    socket.on('disconnect', ()=>{
        leaveRoom(socket)
    })
});

function getUserBySocket(socket){
    streamRooms.forEach(element => {
        element.userList.forEach(u =>{
            if (u.socket.id == socket.id)
                return u;
        })
    });
    return null;
}

function leaveRoom(socket){
    try{
        user = getUserBySocket(socket);
        streamRoom = streamRooms.filter(e => e.name == user.room)
        streamRoom.userLeave(user);
    }catch(e){
        console.warn("Error occured while disconnecting a Client" + e);
    }
}

function loadStreamListFromFile(){
    const path = process.argv.length >2 ? process.argv[2] : 'streams.json';
    try{
        if (fs.existsSync(path)){
    
        }else{
            fs.copyFileSync('streams.json.standard', path);
        }
    }catch(e){
        console.error("loading StreamList from config was not possible : " + e);
    }
    let raw = fs.readFileSync(path);
    let streamlist = JSON.parse(raw);

    streamlist.streams.forEach(element => {
        streamRooms.push(StreamRoom.from(element))
    });
    dailyMsg = streamlist.msgOfTheDay;

};
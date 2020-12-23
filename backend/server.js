const { Socket } = require("socket.io");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    cors: {
            origin:"*",
    }
});
const fs = require('fs');


const {formatMsg,addHistory,getHistoryByRoom} = require('./utils/messages');
const {userJoin,userLeave, getUser, getRoomUsers} = require('./utils/users');


const botName = "ChatBot"
const PORT = 3714 || process.env.PORT;

//load Streams 
let streamlist = loadStreamListFromFile();
console.log(streamlist);

//app.use(express.static(path.join(__dirname, 'public')));
http.listen(PORT, ()=> console.log(`Server running on port  ${PORT}`));

//run when client connect
io.on('connection', socket =>{

    socket.on('getStreamList', ()=>{
        socket.emit("setStreamList",streamlist);
    });



    //join room
    socket.on('joinRoom', ({userX, room}) => {
        try{
        const user = userJoin(socket.id, userX, room);
        socket.join(user.room);

        //update everyones user and room info
        updateRoomInfo(user.room);

        //send infos to the client
        socket.emit('loadOldMsg', getHistoryByRoom(user.room));
        let x = streamlist.streams.find(e => e.name == room);
        socket.emit('startStream', x)
        }catch (e){
            console.warn("error while joining a room : " + e);
        }
    });

    //listen for msg and broadcast them to the current room
    socket.on('chatMsg', (msg)=>{
        try{
            const user = getUser(socket.id);
            const message = addHistory(user,msg);
            array.forEach(element => {
                
            });
            io.to(user.room).emit('msg', message);
        }catch(e){
            console.warn("error while sending message : " + e);
        }
    });


    //manuell leaving a room
    socket.on('leaveRoom', ()=>{
        leaveRoom(socket.id);
    });

    //run when client disconnect
    socket.on('disconnect', ()=>{
        leaveRoom(socket.id);
    })
});


function leaveRoom(sockedID){
    try{
        const user = userLeave(sockedID);
        if(user){
            updateRoomInfo(user.room);
            }
    }catch(e){
        console.warn("Error occured while disconnecting a Client" + e);
    }
}

function updateRoomInfo(room){
    try{
        io.to(room).emit('roomInfo', {
            room: room,
            users: getRoomUsers(room)
        });
    }catch(e){
        console.warn("Updating Room was not possible" + e);
    }
}


function loadStreamListFromFile(){
    try{
        if (fs.existsSync('streams.json')){
    
        }else{
            fs.copyFileSync('streams.json.standard', 'streams.json');
        }
    }catch(e){
        console.error("loading StreamList from config was not possible : " + e);
    }
    let raw = fs.readFileSync('streams.json');
    let streamlist = JSON.parse(raw);
    return streamlist;
};
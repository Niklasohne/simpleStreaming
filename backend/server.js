const fs = require('fs');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const {formatMsg,addHistory,getHistoryByRoom} = require('./utils/messages');
const {userJoin,userLeave, getUser, getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "ChatBot"
const PORT = 3714 || process.env.PORT;

//load Streams 
let streamlist = loadStreamListFromFile();
console.log(streamlist);

//app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, ()=> console.log(`Server running on port  ${PORT}`));

//run when client connect
io.on('connection', socket =>{

    socket.on('getStreamList', ()=>{
        socket.emit("setStreamList",streamlist);
    });



    //join room
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //update everyones user and room info
        updateRoomInfo(user.room);

        socket.emit('loadOldMsg', getHistoryByRoom(user.room));
    });

    //listen for chatmsg
    socket.on('chatMsg', (msg)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('msg', addHistory(user, msg));
    });

    //run when client disconnect
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);
        if(user){
            //io.to(user.room).emit('msg', formatMsg(botName,`${user.username} has left`));

            updateRoomInfo(user.room);
        }
    })
});



function updateRoomInfo(room){
    io.to(room).emit('roomInfo', {
        room: room,
        users: getRoomUsers(room)
    });
}


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
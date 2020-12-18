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
        const user = userJoin(socket.id, userX, room);
        socket.join(user.room);

        //update everyones user and room info
        updateRoomInfo(user.room);

        //send infos to the client
        socket.emit('loadOldMsg', getHistoryByRoom(user.room));
        let x = streamlist.streams.find(e => e.name == room);
        socket.emit('startStream', x)
    });

    socket.on('leaveRoom', ()=>{
        const user = userLeave(socket.id);
        if(user){
            //io.to(user.room).emit('msg', formatMsg(botName,`${user.username} has left`));

            updateRoomInfo(user.room);
        }
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
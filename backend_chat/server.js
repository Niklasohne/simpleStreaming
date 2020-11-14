const app = require("express")();

const http = require("http").Server(app);

const io = require("socket.io")(http);

PORT = 3015;


let users = [];
let messages = [];

let index = 0;

io.on("connection", socket =>{
    console.log("connection");

    socket.emit(`loggedIn`, {
        users: users.map(s => s.username),
        messages : messages
    });
 
    socket.on('startup', x=>{
        socket.emit(`loggedIn`,{
            users: users.map(s => s.username),
            messages : messages
        });
    });

    socket.on('newuser', username =>{
        console.log(`${username} has joined`)
        socket.username = username;
        users.push(socket);

        io.emit('userOnline', socket.username);
    });

    socket.on('msg', msg =>{
        let message = {
            index : index,
            username : socket.username,
            msg : msg
        }
        messages.push(message);
        io.emit('msg', message);

        index++;
    });
    
    //Disconnect
    socket.on("disconnect", () =>{
        console.log(`${socket.username} has left the Chat`);
        io.emit("userleft", socket.username);
        users.splice(users.indexOf(socket),1);
    });


});

http.listen(PORT,()=>{
    console.log("Listening on Port %s", PORT)
});

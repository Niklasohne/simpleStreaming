const chatForm = document.getElementById('chat-form');
const chatDisplay = document.querySelector('.chat-messages');

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


//getUserName and room

const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});

const socket = io();

//joinChatroom
socket.emit('joinRoom', {username, room});

//load room info
socket.on('roomInfo', ({room, users})=>{
    outputRoomName(room);
    outputRoomUsers(users);
});


socket.on('loadOldMsg', msgList => {
    console.log(msgList)
    msgList.forEach(e => outputMsg(e))
})


socket.on("msg", parameter=>{
    console.log(parameter);
    outputMsg(parameter);
})


//message submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    //emit message to server
    const msg = e.target.elements.msg.value;
    socket.emit('chatMsg',msg);

    //scroll down
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    //clear Input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

//Output meg to DOM
function outputMsg(msg){
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
                     <p class="text">${msg.text}</p>`;
                     chatDisplay.appendChild(div);
};

//add room name to DOM
function outputRoomName(room){
    roomName.innerHTML = room;
};


//add users to DOM
function outputRoomUsers(users){
    userList.innerHTML = ` ${users.map(u => `<li>${u.username}</li>`).join('')}`;
};
const moment = require('moment');


const history = [];

function formatMsg(username,room,text){
    return{
        username,
        text,
        room,
        time: moment().format('h:mm a')
    }
}


function addHistory(user, text){
    const msg = formatMsg(user.username, user.room, text);
    history.push(msg);
    console.log(history);
    return msg;
}

function getHistoryByRoom(room){
    return history.filter(m => m.room == room);
}


module.exports = {
    formatMsg,
    addHistory,
    getHistoryByRoom
}
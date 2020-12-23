const users = [];

//join user to Chat
function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);
    return user;
}

function getUser(id){
    return users.find(user=> user.id == id);
}

function userLeave(id){
    const index = users.findIndex(u => u.id == id)
    if(index != -1){
        return users.splice(index,1)[0];
    }
}

function getRoomUsers(room){
    return users.filter(u => u.room == room);
}

module.exports = {
    userJoin,
    userLeave,
    getUser,
    getRoomUsers
}
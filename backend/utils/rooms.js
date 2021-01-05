const moment = require('moment');

class StreamRoom{
    static ID_counter = 1;
    id;
    name = "stream"
    isPrivate = false;
    pw = "";
    date = "1970-01-01"
    time = "10:00"

    //all Availible src Servers
    streamSrc = [];
    currentStreams = [];
    //all messages send in this room
    //currently it is wanted that Messages are gone after an restart!
    ChatHistory = [];
    //all users currently in this Room
    userList = [];

    //-------------  Constructor    -----------------//

    constructor(){
        this.id = StreamRoom.ID_counter++;
    }

    static from (json){
        return Object.assign(new StreamRoom(), json)
    }

    //------------- Stream-Management -----------------//

    //returns a Stream which still has capacity. If all are full return empty String
    getFreeStreamID(){
        this.streamSrc.forEach(element => {
            if(element.current == null)
                element.current = 0;
        });

//        if (this.currentStreams.length == 0) {
//            this.streamSrc.forEach(element => {
//                this.currentStreams.push({
//                    "url": element.url,
//                    "max": element.maxAmmount,
//                    "current": 0
//                })
//            });
//        }

        for (let i = 0; i < this.streamSrc.length; i++) {
            const element = this.streamSrc[i];

            if (element.current < element.max || element.max == -1) {
                element.current++;
                return element.url
            }
        }
        return "";
    }

    getMonitoring(){
        console.log(this.streamSrc)
        //better Monitoring in the Future
    }


    //------------- User Management -----------------//

    //joinUser to group and return an video-URL 
    userJoin(socket, name){
        url = this.getFreeStreamID();
        
        //if the Servers are overloaded the user is not allowed to join the server
        if(url == ""){
            return "";
        }

        newUser = {
            "socket" : socket,
            "name" : name,
            "srcURL": url,
        }
        userList.push(newUser);

        this.updateStreamInfo();
        this.sendStreamURL(newUser);
        this.sendOldMessages(newUser);
    }


    userLeave(socketID){
        userTmp = this.userList.filter(e=> e.socketID == e.socketID);
        this.userList = this.userList.filter(e => e.socketID !== socketID);

        this.streamSrc.forEach(e =>{
            if(e.name ==userTmp.srcURL){
                e.current --;
                return;
            }
        });
    }

    //------------- Chat Management -----------------//

    addMsg(name, msg){
        newMsg = {
            "name": name,
            "time": moment().format('h:mm a'),
            "msg" : msg
        }
        this.ChatHistory.push(newMsg);
        this.sendMsg(newMsg);
    }

    loadMessages(){
        return this.ChatHistory;
    }



    //------------- Socket Interaction -----------------//
    //send a TextMessage to all connected frontends
    sendMsg(msg){
        try{
            this.userList.forEach(user => {
                user.socket.emit(SENDNEWMESSAGE, msg)
            });
        }catch(e){
            console.warn("error while sending message : " + e);
        }

    }

    //update Stream infos like who is currently watching
    updateStreamInfo(){
        try{
            //genUserlist with only Names
            tmpUserList = []
            this.userList.forEach(u => tmpUserList.push(u.name));
            newInfo = {
                "room": this.name,
                "users": tmpUserList
            };

            //send to every User in this Room
            this.userList.forEach(u => u.socket.emit(UPDATEINFO, newInfo));
        }catch(e){
            console.warn("error while sending message : " + e);
        }
    }

    //send the Stream-URL to a frontend
    sendStreamURL(user){
        try{
            user.socket.emit(STARTSTREAM, user.srcURL)
        }catch(e){
            console.warn("error while sending URL to " + user.name + " : " + e);
        }
    }

    sendOldMessages(user){
        user.socket.emit(LOADOLDMSG, this.loadMessages);
    }


}

module.exports = {
    StreamRoom
}
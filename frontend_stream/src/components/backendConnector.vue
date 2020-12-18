<template>
  <div class="backend">
  </div>
</template>

<script>
import io from 'socket.io-client';
export default {
	name: 'Backend',
	data: function () {
		return {
			username: "Anonym",
			//socket: io("http://dies-das-ananas.eu:3015", {transports: ['websocket'], upgrade: false}),
			socket: io("http://localhost:8080", {transports: ['websocket'], upgrade: false}),
		}
	},
	methods: {

    },
	mounted: function () {
		this.username = prompt("wie heißt du? (wird nur für den Chat genutzt)", "Anonymous");
		if (!this.username) {
			this.username = "Anonymous";
		}
        
        //setup eventBus
        this.emitter.on("getStreamList", ()=>{
                this.socket.emit('getStreamList', '');
        });

        
        this.emitter.on("joinRoom", ({room}) =>{
            const user = this.username;
            this.socket.emit('joinRoom', {user,room});
        });

        this.emitter.on("sendMsg", msg =>{
            this.socket.emit('chatMsg',msg);
        });

        //setup Server Listener
        this.socket.on("setStreamList",list=>{
            this.emitter.emit('setStreamList', list);
		});
        this.socket.on('loadOldMsg', msgList => {
            this.emitter.emit('loadOldMsg', msgList)
        })

        this.socket.on('roomInfo', ({room, users})=>{
            this.emitter.emit('roomInfo', {room, users})
        });
        this.socket.on("msg", parameter=>{
            this.emitter.emit('msg', parameter);
        });



	},
	unmounted: function(){
        //do Stuff
    }
}
</script>
<template>
	<div id="chat">
		<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Username: {{ username }}</p>
			<p class="online">Online: {{ users.length }}</p>
		</div>
		<ChatRoom v-bind:messages="messages" v-on:sendmessage="this.sendMsgToServer" />
	</div>
</template>

<script>
import io from 'socket.io-client';
import ChatRoom from './ChatRoom';
export default {
	name: 'ChatWindow',
	components: {
		ChatRoom
	},
	data: function () {
		return {
			username: "",
			socket: io("http://dies-das-ananas.eu:3015", {transports: ['websocket'], upgrade: false}),
			messages: [],
      users: [],
		}
	},
	methods: {
		joinServer: function () {
			this.socket.emit('startup',"");
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.users = data.users;
				this.socket.emit('newuser', this.username);
			});
			this.listen();
		},
		listen: function () {
			this.socket.on('userOnline', user => {
				this.users.push(user);
			});
			this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
			});
			this.socket.on('msg', message => {
				this.messages.unshift(message);

			});
		},
		sendMsgToServer: function (message) {
      console.log("sending")
			this.socket.emit('msg', message);
		}
	},
	mounted: function () {
		this.username = prompt("What is your username?", "Anonymous");
		if (!this.username) {
			this.username = "Anonymous";
		}
		this.joinServer();
	},
	unmounted: function(){
		this.socket.disconnect();
	}
}
</script>

<style lang="scss">
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}
#chat {
	display: flex;
	flex-direction: column;
	height: 92%;
	width: 100%;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}


</style>
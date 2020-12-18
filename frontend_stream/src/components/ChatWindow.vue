<template>
	<div id="chat">
		<div class="header">
			<h1>Chatroom</h1>
			<p class="username">Username: {{ username }}</p>
			<div class="online" v-for="u in users" v-bind:key="u._id">
				<div class="username">{{u.username}}</div>
			</div>
		</div>
		<ChatRoom v-bind:messages="messages" v-on:sendmessage="this.sendMsgToServer" />
	</div>
</template>

<script>
import ChatRoom from './ChatRoom';
export default {
	name: 'ChatWindow',
	components: {
		ChatRoom
	},
	data: function () {
		return {
			username: "",
			messages: [],
			users: [],
		}
	},
	methods: {
		joinServer: function () {
		},
	},
	mounted: function () {
		this.emitter.on('setName', (name) => {
			this.username = name;
		});

		this.emitter.on('roomInfo', ({room, users}) =>{
			console.log("debug : " + room);
			this.users = users;
			console.log(users);
		});

		this.emitter.on('loadOldMsg', msgList => this.messages = msgList)

		this.emitter.on('msg', msgList => this.messages.push(msgList))
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
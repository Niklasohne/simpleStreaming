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
			console.log("asd");
		});
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
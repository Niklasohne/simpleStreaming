<template>
	<div id="chat">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />

		<div class="chat-container">
			<header class="chat-header">
				<h2><i class="fas fa-comments"></i>  Live Chat:</h2>
				<a href="/" class="btn">Leave Room</a>
			</header>
			<main class="chat-main">
				<div class="chat-sidebar">
					<h3><i class="fas fa-users"></i> Users ({{users.length}})</h3>
					<div class="online" id="users" v-for="u in users" v-bind:key="u._id">
							<div class="username">{{u.username}}</div>
					</div>
				</div>
				<div class="chat-messages" ref="messages">
					<div class="message" v-for="message in messages" v-bind:key="message._id">
						<p class="meta">{{message.username}} <span>{{message.time}}</span></p>
						<div class="text">{{message.text}}</div>
					</div>
				</div>	
			</main>
			<div class="chat-form-container">
				<form id="chat-form">
					<input
						id="msg"
						v-model="msg"
						type="text"
						placeholder="Enter Message"
						required
						autocomplete="off"
					/>
					<button class="btn"  v-on:click.self.prevent="sendMessage" v-bind:disabled="!msg"><i class="fas fa-paper-plane"></i> Send</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ChatWindow',
	data: function () {
		return {
			username: "",
			messages: [],
			users: [],
			roomname: "_ _ _", 
			msg: "",
		}
	},
	methods: {
		sendMessage: function () {
			if (!this.msg) {
				return;
			}
			this.emitter.emit('sendMsg', this.msg);
			this.msg = "";
		},
		scroll: function(){
			const chatDisplay = document.querySelector('.chat-messages')
			chatDisplay.scrollTop = chatDisplay.scrollHeight +1;
		}
	},
	mounted: function () {

		this.roomname = this.$route.query.name

		this.emitter.on('setName', (name) => {
			this.username = name;
		});

		this.emitter.on('roomInfo', ({ users}) =>{
			this.users = users;
		});

		this.emitter.on('loadOldMsg', msgList => {
			this.messages = msgList
			this.scroll();
		});

		this.emitter.on('msg', msgList => {
			//add msg
			console.log(msgList)
			this.messages.push(msgList)
			console.log(this.messages)
			//scroll down
			this.scroll();
		});
	}
}
</script>
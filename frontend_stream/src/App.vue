<template>
	<div id="app">
		<div id="videoContainer">
			<Video/>
		</div>
		<div id="chatContainer">
			<ChatWindow/>
		</div>
	</div>
</template>

<script>
import ChatWindow from './components/ChatWindow';
import Video from './components/Video';
export default {
	name: 'app',
	components: {
		Video,
		ChatWindow
	},
	data: function () {
		return {
			a : ""
		}
	}
}
</script>

<style lang="css">
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}
#app {
	height: 100vh;
	width: 100%;
	display: flex;
	margin: 0 auto;
	padding: 15px;
	overflow: auto;
}
#videoContainer{
	width: 70%;
}
#chatContainer{
	vertical-align: top;
	width: 30%;
}
</style>
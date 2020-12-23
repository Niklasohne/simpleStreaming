<template>
	<div id="streaming">
		<div id="videoContainer">
			<div id="information">
				<h1> {{roomname}}</h1> 
			</div>
			<Video/>
		</div>
		<div id="chatContainer">
			<ChatWindow/>
		</div>
	</div>
</template>



<script>

import Video from "../components/Video"
import ChatWindow from "../components/ChatWindow"
export default {
    name: 'Stream',
    components:{
        Video,
        ChatWindow
	},
	data: function () {
		return {
			roomname: "_ _ _", 
		}
	},
    mounted: function () {
		this.roomname = this.$route.query.name;
		this.emitter.emit('joinRoom', this.roomname);
	},
	unmounted: function(){
		this.emitter.emit('leaveRoom', '')
	}

}
</script>


<style>
#streaming {
	height: 95vh;
	max-height: 400vh;
	width: 100%;
	display: flex;
	margin: 0 auto;
	padding: 10px;
}

#information{
	margin: 0 auto;
	margin-top: 30px;
	padding: 20px;
	width: 80%;
	background-color: var(--dark-color-b);
	border-radius: 50px;
	text-align: center;
	
}

#videoContainer{
	height: 100%;
	width: 70%;
}
#chatContainer{
	vertical-align: top;
	width: 30%;
	min-width: 280px;
}


@media (max-width: 1000px) {    
	#information{
	margin: 0 auto;
	margin-top: 10px;
	padding: 10px;
	width: 80%;
	background-color: var(--dark-color-b);
	border-radius: 50px;
	text-align: center;
	
} 
	#streaming {
	display: flex;
	flex-direction: column;
	}

	#videoContainer{
		width: 100%;
		height: 100ch%;
		margin-bottom: 20px;
	}

	#chatContainer{
	vertical-align: top;
	height: 30%;
	width: 100%;
}
}
</style>
<template>
	<div id="streaming">
		<div id="videoContainer">
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
    mounted: function () {
		this.emitter.emit('joinRoom', this.$route.query.name);
	},
	unmounted: function(){
		this.emitter.emit('leaveRoom', '')
	}

}
</script>


<style>
#streaming {
	height: 100vh;
	width: 100%;
	display: flex;
	margin: 0 auto;
	padding: 15px;
	overflow: hidden;
}
#videoContainer{
	height: 90%;
	width: 70%;
}
#chatContainer{
	vertical-align: top;
	width: 30%;
	min-width: 280px;
}


@media (max-width: 1000px) {     
	#streaming {
	display: flex;
	flex-direction: column;
	}

	#videoContainer{
		width: 100%;
		height: 50%;
	}

	#chatContainer{
	vertical-align: top;
	height: 30%;
	width: 100%;
}
}
</style>
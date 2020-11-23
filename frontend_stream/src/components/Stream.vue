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

import Video from "./Video"
import ChatWindow from "./ChatWindow"
export default {
    name: 'Stream',
    components:{
        Video,
        ChatWindow
    },
    mounted: function () {
        this.emitter.emit("startStream", this.$route.query.name);
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
<template>
	<div id="streaming">
		<div id="videoContainer">
			<div id="information">
				<h1> {{roomname}}</h1> 
			</div>
			<Video/>
			<div id="description" v-html="description"></div>
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
			description : "Wenn du diesen platzhalter siehst läd die seite noch den Stream <br/> hier ist nyan cat für dich :)"
		}
	},
    mounted: function () {
		this.roomname = this.$route.query.name;
		this.emitter.emit('joinRoom', this.roomname);

		this.emitter.on('setDescription', desc =>{
			this.description = desc;
		});
	},
	unmounted: function(){
		this.emitter.emit('leaveRoom', '')
	}

}
</script>


<style>

#streaming {
	height: 90vh;
	max-height: 400vh;
	width: 100%;
	display: flex;
	margin: 0 auto;
	padding: 10px;
}

#information{
	margin: 0 auto;
	padding: 15px;
	width: 80%;
	background-color: var(--dark-color-b);
	border-radius: 50px;
	text-align: center;
	
}

#videoContainer{
	height: 100%;
	width: 65%;
}
#chatContainer{
	vertical-align: top;
	width: 30%;
	margin-left: 5%;
	margin-right: 10px;
	max-height: 100vh;
	min-width: 280px;
}
#description{
	width: 96%;
	background-color: var(--light-color-b);
	padding: 15px;
	margin-top: 20px;
	border-radius: 20px;
	height: 150px;
	max-height: 300px;
	overflow-y: scroll;
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
	margin: 0 auto;
	}

	#videoContainer{
		width: 100%;
		height: 135%;
		margin-bottom: 20px;
	}

	#description{
		margin: 0 auto;
		margin-top: 20px;
		overflow: scroll;
	}
	#chatContainer{
	vertical-align: top;
	margin: 0 auto;
	height: 30%;
	width: 100%;
}
}
</style>
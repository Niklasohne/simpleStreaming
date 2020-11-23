<template>
	<div class="Home">
        hier kommt stream Selection etc.

		<div class="streamSelect">
			<div class="streams">
				<div class="stream" v-for="stream in streams" v-bind:key="stream._id">
					<div class="Name">{{stream.name}}</div>
					<div class="Link">{{stream.url}}</div>
					<div class="Time">{{stream.time}}</div>
				</div>
			</div>
		</div>
        
        <router-link to="/stream?name=test">currentStream</router-link>
	</div>
</template>


<script>
import io from 'socket.io-client';
export default {
	name: 'Home',
	data(){
		return{
			socket: io("http://dies-das-ananas.eu:3016"),
			streams: []
		}
	},
	mounted: function () {
		this.socket.emit("getStreamList","");

		this.socket.on("setStreamList",list=>{
			this.streams = list;
		})
	}
}
</script>
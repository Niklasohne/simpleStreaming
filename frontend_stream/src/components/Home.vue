<template>
	<div class="Home">
        hier kommt stream Selection etc.

		<div class="streamSelect">
			<div class="streams" v-bind="streams">
				<div class="stream" v-for="stream in streams" v-bind:key="stream._id">
					<div class="info">
						<div class="Name"><h1>{{stream.name}}</h1></div>
						<div class="Time">Am {{stream.datum}} um {{stream.zeit}}</div>
						<router-link :to="'/stream?name=test'">currentStream</router-link>
					</div>
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
			console.log(list);
			
			this.streams = list.streams;
		})
	}
}
</script>

<style lang="scss" scoped>
.streamSelect {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: #F9F9F9;
	box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
	margin-left: 10%;
	width: 60%;
	.streams {
		flex: 1;
		.stream {
			border-bottom: 1px solid #EFEFEF;
			padding: 10px;
			&:last-of-type {
				border-bottom: none;
			}
			.name {
				font-size: 100%;
				width: 100px;
				margin-right: 15px;
			}
			.message-text {
				flex: 1;
			}
		}
	}
}
</style>
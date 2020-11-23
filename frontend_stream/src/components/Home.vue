<template>
	<div class="Home">
		<h1> Wilkommen auf der Streamingwebsite</h1>
		<div class="streamSelect">
			<h3>Geplante Streams :</h3>
			<div class="streams" v-bind="streams">
				<div class="stream" v-for="stream in streams" v-bind:key="stream._id">
					<div class="info">
						<div class="Name"><h2>{{stream.name}}</h2></div>
						<div class="Time">Am {{stream.datum}} um {{stream.zeit}}</div>
					</div>
					<button class="joinbtn" @click="$router.push({path:'/stream',query:{name:'test'}})"> Join </button>
				</div>
			</div>
		</div>
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
	methods:{
		start(){
			console.log("start");
			this.$router.push({path:'/stream',quary:{name:'test'}});
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

#btn{
	box-shadow: 10px green;
}

.streamSelect {
	flex: 1;
	display: flex;
	flex-direction: column;
	background-color: #F9F9F9;
	box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
	margin-left: 10%;
	width: 40%;
	.streams {
		flex: 1;

		.stream {
			display: flex;
			border-bottom: 1px solid #EFEFEF;
			padding: 20px;
			&:last-of-type {
				border-bottom: none;
			}
			.info{
				flex: 10;
			}
			.joinbtn{
				flex: 4;
			}
		}
	}
}
</style>
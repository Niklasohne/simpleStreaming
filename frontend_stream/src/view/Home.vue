<template>
	<div class="Home">
		<div class="willkommen">
			<h1> Wilkommen auf der Streamingwebsite</h1>
		</div>
		<div class="dailyMsg" v-html="dailyMsg">
		</div>
		<div class="streamSelect">
			<h3>Geplante Streams :</h3>
			<div class="streams" v-bind="streams">
				<div class="stream" v-for="stream in streams" v-bind:key="stream._id">
					<div class="info">
						<div class="Name"><h2>{{stream.name}}</h2></div>
						<div class="Time">Am {{stream.datum}} um {{stream.zeit}}</div>
					</div>
					<button class="joinbtn" @click="$router.push({path:'/stream',query:{name:stream.name}})"> Join </button>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	name: 'Home',
	data(){
		return{
			dailyMsg: "O happy day (looks like there is no daily message)",
			streams: []
		}
	},
	mounted: function () {
		this.emitter.emit("getStreamList", "");
		this.emitter.on("setStreamList", list=>{
			this.streams = list.streams;
			this.dailyMsg = list.msgOfTheDay;
		});
	}
}
</script>

<style lang="scss" scoped>


.home{
	width: 100%;
}

.willkommen{
	padding: 10px;
	margin: 0 auto;
	width: 40%;
}

.dailyMsg{
	max-width: 700px;
	background-color: var(--light-color-b);
	padding: 10px;
	border-radius: 20px;
	margin: 0 auto;
}

.streamSelect {
	flex: 1;
	display: flex;
	flex-direction: column;
	margin: 4% auto;
	padding: 10px;
	text-align: center;
	min-width: 370px;
	width: 40%;
	.streams {
		flex: 1;

		.stream {
			background: var(--light-color-b);
			border-radius: 15px;
			display: flex;
			border-bottom: 1px solid #EFEFEF;
			padding: 20px;
			margin: 10px;
			&:last-of-type {
				border-bottom: none;
			}
			.info{
				flex: 10;
			}
			.joinbtn{
				background: var(--dark-color-a);
				border-radius: 10px;
				flex: 4;
			}
		}
	}
}
</style>
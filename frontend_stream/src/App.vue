<template>
	<div id="app">
		APP lol
		<router-view :key='$route.fullPath'></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
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

#app{
	box-sizing: border-box;
}
</style>
<template>
	<div id="app">
		<router-view :key='$route.fullPath'></router-view>
		<backend-connector/>
	</div>
</template>

<script>
import BackendConnector from './components/backendConnector.vue'
export default {
	name: 'app',
	components: {
		BackendConnector
	},
	data: function () {
		return {
			a : ""
		}
	}
}
</script>

<style lang="css">
#app{
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 10px;
	padding: 0;
}

#app{
	box-sizing: border-box;
}
</style>
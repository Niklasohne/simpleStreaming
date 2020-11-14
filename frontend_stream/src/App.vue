<template>
  <div id="app">
    <div class="header">
      <h1> Live Chat </h1>
      <p class="username"> Username : {{ username }}</p>
      <p class="online">Currently Online : {{users.length}}</p>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {},
  data: function(){
    return{
      username : "",
      socket : io("http://192.168.178.55:3000"),
      messages: [],
      users:[]
    }
  },
  methods:{
    joinServer: function(){
      this.socket.on('loggedIn', data =>{
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newuser', this.username);
      })
    }
  },
  mounted: function(){
    this.username = prompt("What is your name (used only for chatting function)", "Anonymous");
    if(!this.username)
      this.username = "Anonymous";
  }

}
</script>

<style lang="scss">
body{
  font-family: 'Avenir',Helvetica, Arial, sans-serif;
  color: #2C3E50;
  margin: 0;
  padding: 0;
}

#app{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
}
</style>

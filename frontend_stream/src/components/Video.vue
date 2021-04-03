<template>
  <div class="player">
    <video
      id="vid1"
      class="video-js vjs-default-skin"
      autoplay
      data-setup='{ "techOrder": ["youtube", "html5"] , "youtube": { "ytControls": 2 }}'
    >
      <source src="https://www.youtube.com/watch?v=SkgTxQm9DWM" type="video/youtube">
    </video>
  </div>
</template>

<script>
import "videojs-youtube"
import videojs from 'video.js'

export default {
  name: 'Video',
  computed: {
    player2(){
      return this.$refs.videoPlayer2
    }
  },
  methods: {  
    playVideo: function (source) {

      var player = videojs("vid1")
      if (source.includes("youtube")){
        player.src({src:source , type: "video/youtube"})
      } else{
        player.src({src:source , type: "application/x-mpegurl"})
      }
    }
  },
  mounted: function () {
    this.emitter.on("startStream", name =>{
      this.playVideo(name.url);
      this.emitter.emit('setDescription', name.desc);
    });
  },
  unmounted: function(){
	}
}
</script>

<style scoped>
  .player {
    padding-top: 10px;
    width: 100%;
    
  }
  .vjs-youtube {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  width: 100%;
  }

  .vjs-youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }

</style>

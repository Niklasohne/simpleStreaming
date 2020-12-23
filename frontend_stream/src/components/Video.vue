<template>
  <div class="player">
    <videoPlayer ref="videoPlayer"
                  class="vjs-custom-skin"
                  :options="playerOptions">
    </videoPlayer>
  </div>
</template>

<script>
import {videoPlayer} from 'vue-videojs7'

export default {
  name: 'Video',
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        autoplay: false,
        controls: true,
        aspectRatio: "16:9",
        nativeAudioTracks: false,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {  
    playVideo: function (source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      this.player.reset()
      this.player.src(video)
      //this.player.play() somehow bug with autoplay
    }
  },
  mounted: function () {
    this.emitter.on("startStream", name =>{
      this.playVideo(name.url);
    });
  },
  unmounted: function(){
	}
}
</script>

<style scoped>
  .player {
    padding-top: 50px;
    width: 100%;
    
  }
  .vjs-custom-skin {
    height: 100% !important;
    width: 100%;
  }

  .vjs-custom-skin /deep/ .video-js {
    height: 99%;
    width: 99%;
  }
</style>

<template>
  <div class="player">
    <videoPlayer ref="videoPlayer"
                  class="vjs-custom-skin"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @ready="onPlayerReady($event)">
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
        autoplay: true,
        controls: true,
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
    onPlayerPlay (player) {
      console.log('player play!', player)
    },
    onPlayerReady (player) {
      console.log('player ready!', player)
      this.player.play()
    },
    playVideo: function (source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      //this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      //this.player.load()
      this.player.play()
    }
  },
  mounted: function () {
    this.emitter.on("startStream", name =>{
            console.log("Video : " + name);
    });
  },
  unmounted: function(){
		this.player.pause();
	}
}
</script>

<style scoped>
  .player {
    width: 100%;
    height: 100%;
  }
  .vjs-custom-skin {
    height: 100% !important;
    width: 100%;
  }

  .vjs-custom-skin /deep/ .video-js {
    height: 100%;
    width: 99%;
  }
</style>

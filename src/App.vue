<template>
  <div id="app">
    <HelloWorld/>
    <img
      v-if="isPlay && false"
      @click="pauseMusic"
      :class="{ 'play-icon': !0, 'play-icon-active': isPlay }"
      src="http://imgs.zizaihome.com/0b288671-e212-4e28-a1cf-f05a4c8c5934.png"
      alt=""
    />
    <img
      v-if="false"
      class="play-icon"
      @click="playMusic"
      src="http://imgs.zizaihome.com/8506bcbb-f682-45a9-84a5-8cf142370e98.png"
      alt=""
    />
    <audio
      ref="audio"
      src=""
      preload
      autoplay
      loop
      type="audio/mpeg"
      v-if="false"
    ></audio>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import initShare from './components/init-share';

export default {
  name: 'App',
  data() {
    return {
      isPlay: false,
    }
  },
  components: {
    HelloWorld
  },
  created() {
    // initShare({
    //   title: '标题',
    //   desc:
    //     '描述',
    //   link: window.location.href,
    //   imgUrl: 'http://imgs.zizaihome.com/04924591-37d4-4d6b-9dd1-f50f21990012.png',
    // });
  },
  methods: {
    playMusic() {
      const { audio } = this.$refs;

      this.isPlay = !0;
      audio.play();
    },
    pauseMusic() {
      const { audio } = this.$refs;

      this.isPlay = !1;
      audio.pause();
    },
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.play-icon {
  position: absolute;
  z-index: 15000;
  right: 0.2rem;
  top: 0.62rem;
  width: 0.21rem;
}
.play-icon-active {
  animation: playMove 4s linear infinite;
}
@keyframes playMove {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

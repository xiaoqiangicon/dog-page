<template>
  <div id="app">
    <HelloWorld ref="pages"/>
    <audio
      ref="audio"
      src="https://cdn.xiugou.club/blue_dash/bg.wav"
      preload
      autoplay
      loop
      type="audio/mpeg"
    ></audio>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { setTimeout } from 'timers';

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
  mounted() {
    const { audio, pages } = this.$refs;
    let { rocketAudio, holeAudio, equipAudio, btnAudio, resultAudio } = pages.$refs;

    // ios音频无法自动播放，一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
    audio.play();
    let isFirstTouch = true;
    document.addEventListener(
      'touchstart',
      function() {
        if (isFirstTouch) {
          audio.play();
          isFirstTouch = false;
        } 
      },
      false
    );
    //微信必须加入Weixin JSAPI的WeixinJSBridgeReady才能生效
    document.addEventListener(
      'WeixinJSBridgeReady',
      function() {
        audio.play();
        // 为了预加载音乐文件；iphone下点击才下载
        rocketAudio.muted = true;
        rocketAudio.play();
        equipAudio.muted = true;
        equipAudio.play();
        btnAudio.muted = true;
        btnAudio.play();
        holeAudio.muted = true;
        holeAudio.play();
        resultAudio.muted = true;
        resultAudio.play();
      },
      false
    );

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        audio.pause();
      } else {
        setTimeout(() => {
          audio.play();
        }, 500)
      }
    })
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

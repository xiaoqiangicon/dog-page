<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

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

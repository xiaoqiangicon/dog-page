<template>
  <div class="container">
    <section ref="pageList">
      <section class="page-a bg-adaptive" ref="pageA" @click="pageAClick">
        <div class="page-a-content">
          <div class="page-a-line"></div>
          <p class="page-a-text">{{pageATyper.output}}</p>
        </div>
      </section>
      <section class="page-b bg-adaptive" ref="pageB">
        <div class="nail-box" @click="clickNailCheck"></div>
      </section>
      <section class="page-c bg-adaptive" ref="pageC" @click="init">page c</section>
    </section>
  </div>
</template>

<script src="./HelloWorld.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HelloWorld.css" scoped>

</style>

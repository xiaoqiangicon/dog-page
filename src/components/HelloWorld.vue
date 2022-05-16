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
      <section class="page-c bg-adaptive" ref="pageC" @click="init">
        <img class="page-c-dog" src="../assets/bluedash/2/2-狗子.png" />
        <img class="page-c-hole" src="../assets/bluedash/黑洞.png" />
        <img class="page-c-text1" src="../assets/bluedash/1/1-狗出现后的文字1.png" :class="{'effect-out': pageBLoaded}" />
        <img class="page-c-text2" src="../assets/bluedash/1/1-狗出现的文字2.png" :class="{'effect-in': pageBLoaded}" />
      </section>
      <section class="page-d bg-adaptive" ref="pageD">
        <img class="page-d-dog" src="../assets/bluedash/2/2-狗子.png" />
      </section>
    </section>
  </div>
</template>

<script src="./HelloWorld.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HelloWorld.css" scoped>

</style>

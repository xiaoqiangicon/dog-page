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
        <div class="nail-box" @click="clickNailCheck">
          <div class="nail-line-box">
            <div class="nail-line" :class="{'nail-line-active': isScan}"></div>
          </div>
        </div>
      </section>
      <section class="page-c bg-adaptive" ref="pageC">
        <img class="page-c-dog" @click="clickDog" src="../assets/bluedash/2/2-狗子.png" ref="pageCDog"/>
        <img class="page-c-hole" ref="hole" src="../assets/bluedash/黑洞.png" />
        <img class="page-c-text1" ref="pageCText1" src="../assets/bluedash/1/1-狗出现后的文字1.png" />
        <img class="page-c-text2" ref="pageCText2" src="../assets/bluedash/1/1-狗出现的文字2.png"  />
      </section>
      <section class="page-d bg-adaptive" ref="pageD">
        <div class="page-d-guide" @click="clickPageDGuide" v-if="!hidePageDGuide">
          <div class="page-d-guide-content">
            <img class="page-d-guide-avatar" src="../assets/bluedash/2/2-对话框里的头像.png" />
            <div class="page-d-guide-tips">{{pageDTyper.output}}</div>
          </div>
        </div>
        <img class="page-d-dog" src="../assets/bluedash/2/2-狗子.png" />
        <div class="equip-box">
          <div class="equip-item" :class="{'equip-item-gray': item.selected}" @click="addEquip(item)" v-for="(item) in equip" :key="item.icon">
            <img :src="item.icon" class="equip" />
          </div>
        </div>
        <div class="page-d-btn" :class="{'page-d-btn-active': setEquip.length === 2}" @click="clickPageDBtn"></div>
      </section>
      <section class="page-e bg-adaptive" ref="pageE">
        <div class="page-e-guide" v-if="!hidePageEGuide">
          <div class="page-e-guide-content"></div>
        </div>
        <div class="page-e-dog" :class="[`page-e-dog-${step}`]"></div>
        <div class="page-e-bar"></div>
        <div class="page-e-circle" @click="clickPageECircle" ref="pageECircle"></div>
        <div class="page-e-btn" @click="clickPageEBtn"></div>
      </section>
      <section class="page-f bg-adaptive" ref="pageF">
        <img class="page-f-bg" src="../assets/bluedash/5/5-背景浮标.png" />
        <div class="page-f-rocket-box" ref="rocketBox">
          <img class="page-f-rocket" ref="rocket" src="../assets/bluedash/5/5-火箭.png" />
          <img class="page-f-hot" ref="hot" src="../assets/bluedash/5/5-火箭动画用-大火.png" />
        </div>
        <img class="page-f-fire" ref="fire" src="../assets/bluedash/5/5-火箭动画用火苗.png" />
      </section>
      <section class="page-g bg-adaptive" ref="pageG">
        
      </section>
    </section>
  </div>
</template>

<script src="./HelloWorld.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HelloWorld.css" scoped>

</style>

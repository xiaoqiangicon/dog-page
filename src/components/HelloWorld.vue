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
        <div class="nail-box" @touchstart="clickNailCheck">
          <div class="nail-line-box">
            <div class="nail-line" ref="nailLine"></div>
          </div>
        </div>
      </section>
      <section class="page-c bg-adaptive" ref="pageC">
        <img class="page-c-dog" @click="clickDog" src="../static/3-感觉来了的-1.png" ref="pageCDog"/>
        <img class="page-c-hole" ref="hole" src="../static/黑洞.png" />
        <img class="page-c-text1" ref="pageCText1" src="../static/1-狗出现后的文字1.png" />
        <img class="page-c-text2" ref="pageCText2" src="../static/1-狗出现的文字2.png"  />
      </section>
      <section class="page-d bg-adaptive" ref="pageD">
        <div class="page-d-guide" ref="pageDGuide" v-if="!hidePageDGuide">
          <div class="page-d-guide-content" @click="clickPageDGuide">
            <img class="page-d-guide-avatar" src="../static/2-对话框里的头像.png" />
            <div class="page-d-guide-tips">{{pageDTyper.output}}</div>
            <div class="page-d-guide-continue" ref="pageDGuideContinue">点击继续</div>
          </div>
        </div>
        <div class="page-d-dog-box">
          <img class="page-d-dog" src="../static/2-狗子.png" />
          <img class="page-d-icon" :class="[`page-d-icon-${item.id}`, item.selected ? 'page-d-icon-active' : '']"  :src="item.decor" v-for="(item) in equip" :key="item.id" />
        </div>
        <p class="page-d-icon-tip" :class="[`page-d-icon-tip-${item.id}`]" v-for="(item) in equip" :key="item.descor" :ref="'pageDIconTip' + item.id">{{ item.tips }}</p>
        <div class="equip-box">
          <div class="equip-item" :class="{'equip-item-gray': item.selected}" @click="addEquip(item)" v-for="(item) in equip" :key="item.icon">
            <img :src="item.icon" class="equip" />
          </div>
        </div>
        <div class="page-d-btn" ref="pageDBtn" :class="{'page-d-btn-active': setEquip.length === 2}" @click="clickPageDBtn"></div>
      </section>
      <section class="page-e bg-adaptive" ref="pageE">
        <div class="page-e-guide" ref="pageEGuide" v-if="!hidePageEGuide">
          <div class="page-e-guide-content" @click="closePageEGuide">
            <img class="page-d-guide-avatar" src="../static/2-对话框里的头像.png" />
            <div class="page-d-guide-tips">{{pageETyper.output}}</div>
            <div class="page-d-guide-continue" ref="pageEGuideContinue">点击继续</div>
          </div>
        </div>
        <div class="page-e-dog" :class="[`page-e-dog-${step}`]">
          <img class="page-d-icon" :class="[`page-d-icon-${item.id}`, item.selected ? 'page-d-icon-active' : '']"  :src="item.decor" v-for="(item) in equip" :key="item.id" />
        </div>
        <div class="page-e-bar" :class="[`page-e-bar-${step}`]"></div>
        <div class="page-e-circle" @click="clickPageECircle" ref="pageECircle"></div>
        <div class="page-e-btn" @click="clickPageEBtn"></div>
      </section>
      <section class="page-f bg-adaptive" ref="pageF">
        <img class="page-f-bg" src="../static/5-背景浮标.png" />
        <div class="page-f-rocket-box" ref="rocketBox">
          <img class="page-f-rocket" ref="rocket" src="../static/5-火箭.png" />
          <img class="page-f-hot" ref="hot" src="../static/5-火箭动画用-大火.png" />
        </div>
        <img class="page-f-fire" ref="fire" src="../static/5-火箭动画用火苗.png" />
      </section>
      <section class="page-g bg-adaptive" ref="pageG">
        <div id="share" class="page-g-share" ref="share">
          <img class="page-g-bg" style="position: absolute;left: 0; top: 0;" :src="resultImage" />
        </div>
        <div class="play-again" src="http://imgs.zizaihome.com/0eeb05c2-d297-476c-9c03-7d1a70581278.png" @click="playAgain" />
        <button @click="getShareImg" style="position: absolute; z-index: 10000">生成分享图</button>
      </section>
      <section class="page-h bg-adaptive" ref="pageH">
        <div id="share" class="page-g-share" ref="share">
          <img class="page-g-bg" style="position: absolute;left: 0; top: 0;" :src="shareImage" />
        </div>
        <div class="play-again" src="http://imgs.zizaihome.com/0eeb05c2-d297-476c-9c03-7d1a70581278.png" @click="playAgain" />
        
      </section>
    </section>
    <audio
      ref="equipAudio"
      src="../static/点击装备音效.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="btnAudio"
      src="../static/点击按钮音效.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="audio"
      src="../static/背景音乐.wav"
      preload
      autoplay
      loop
      type="audio/mpeg"
    ></audio>
    <!-- iphone只有点击元素才会加载音频，这样可以提前加载到 -->
    <img src="../static/点击装备音效.wav" style="opacity: 0" />
    <img src="../static/点击按钮音效.wav" style="opacity: 0" />
  </div>
</template>

<script src="./HelloWorld.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HelloWorld.css" scoped>

</style>

<template>
  <div class="container">
    <section ref="pageList">
      <section class="page-loading bg-adaptive" ref="pageLoading" v-if="showLoading">
      <div class="page-loading-progress">
        <van-progress :percentage="currentResolve * 12" />
      </div>
      </section>
      <section class="page-a bg-adaptive" ref="pageA" @click="pageAClick">
        <div class="page-a-content">
          <div class="page-a-line"></div>
          <p class="page-a-text"><span style="display: inline-block; margin-bottom: 6px;">{{pageATyper.output}}</span><br /><span style="display: inline-block; margin-bottom: 6px;">{{pageA1Typer.output}}</span><br />{{pageA2Typer.output}}</p>
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
        <div class="page-c-guide" v-if="!hidePageCGuide" @click="clickDog">
          <img class="page-c-nail" :class="{'page-c-nail-active': pageCLoaded || 1}" src="https://cdn.lencooltech.com/blue_dash/hand.png" ref="pageCNail" />
        </div>
        <img class="page-c-dog" @click="clickDog" src="https://cdn.lencooltech.com/blue_dash/dog1.png" ref="pageCDog"/>
        <img class="page-c-hole" ref="hole" src="https://cdn.lencooltech.com/blue_dash/hole.png" />
        <img class="page-c-text1" ref="pageCText1" src="https://cdn.lencooltech.com/blue_dash/dog_word1.png" />
        <img class="page-c-text2" ref="pageCText2" src="https://cdn.lencooltech.com/blue_dash/dog_word2.png"  />
      </section>
      <section class="page-d bg-adaptive" ref="pageD">
        <div class="page-d-guide" ref="pageDGuide" v-if="!hidePageDGuide">
          <div class="page-d-guide-content" @click="clickPageDGuide">
            <img class="page-d-guide-avatar" src="https://cdn.lencooltech.com/blue_dash/dialog_head.png" />
            <div class="page-d-guide-tips">{{pageDTyper.output}}<br />{{pageD1Typer.output}}<span style="font-weight: 600">{{pageD2Typer.output}}</span>{{pageD3Typer.output}}</div>
            <div class="page-d-guide-continue" ref="pageDGuideContinue"><点击继续></div>
          </div>
        </div>
        <div class="page-d-dog-box">
          <img class="page-d-dog" src="https://cdn.lencooltech.com/blue_dash/dog1.png" />
          <img class="page-d-icon" :class="[`page-d-icon-${item.id}`, item.selected ? 'page-d-icon-active' : '']"  :src="item.decor" v-for="(item) in equip" :key="item.id" />
        </div>
        <p class="page-d-icon-tip" :class="[`page-d-icon-tip-${item.id}`]" v-for="(item) in equip" :key="item.descor" :ref="'pageDIconTip' + item.id">{{item.title}}<br />{{ item.tips }}</p>
        <div class="equip-box">
          <div class="equip-item" :class="{'equip-item-gray': item.selected}" @click="addEquip(item)" v-for="(item) in equip" :key="item.icon">
            <img :src="item.icon" class="equip" />
          </div>
        </div>
        <div class="page-d-btn" ref="pageDBtn" :class="{'page-d-btn-active': setEquip.length === 2}" @click="clickPageDBtn"></div>
      </section>
      <section class="page-e bg-adaptive" ref="pageE">
        <div class="page-e-mask" v-if="!hidePageEMask" @click="clickPageECircle">
          <img class="page-e-nail" :class="{'page-c-nail-active': 1}" src="https://cdn.lencooltech.com/blue_dash/hand.png"/>
        </div>
        <div class="page-e-guide" ref="pageEGuide" v-if="!hidePageEGuide">
          <div class="page-e-guide-content" @click="closePageEGuide">
            <img class="page-d-guide-avatar" src="https://cdn.lencooltech.com/blue_dash/dialog_head.png" />
            <div class="page-d-guide-tips">{{pageETyper.output}}<span style="font-weight: bold">{{pageE1Typer.output}}</span>{{pageE2Typer.output}}</div>
            <div class="page-d-guide-continue" ref="pageEGuideContinue"><点击继续></div>
          </div>
        </div>
        <div class="page-e-dog" :class="[`page-e-dog-${step}`]">
          <img class="page-d-icon" :class="[`page-d-icon-${item.id}`, item.selected ? 'page-d-icon-active' : '', `page-e-icon-${item.id}`]"  :src="item.decor" v-for="(item) in equip" :key="item.id" />
        </div>
        <div class="page-e-bar" :class="[`page-e-bar-${step}`]"></div>
        <div class="page-e-circle" @click="clickPageECircle" ref="pageECircle"></div>
        <div class="page-e-btn" @click="clickPageEBtn"></div>
      </section>
      <section class="page-f bg-adaptive" ref="pageF">
        <img class="page-f-bg" src="https://cdn.lencooltech.com/blue_dash/bg4.png" />
        <div class="page-f-rocket-box" ref="rocketBox">
          <img class="page-f-rocket" ref="rocket" src="https://cdn.lencooltech.com/blue_dash/rocket.png" />
          <img class="page-f-hot" ref="hot" src="https://cdn.lencooltech.com/blue_dash/fire_big.png" />
        </div>
        <img class="page-f-fire" ref="fire" src="https://cdn.lencooltech.com/blue_dash/fire_mini.png" />
        <van-loading text-color="#fff" color="#fff" :vertical="true" type="spinner" v-if="!resultImage && pageFRunFinish">结果生成中</van-loading>
      </section>
      <section class="page-g bg-adaptive" ref="pageG">
        <div id="share" class="page-g-share" ref="share">
          <img class="page-g-bg" style="position: absolute;left: 0; top: 0;" :src="resultImage" />
          <img class="page-g-bg" style="position: absolute;left: 0; top: 0;z-index: 999;opacity: 0;" :src="shareImage" />
          <img class="play-again" src="https://cdn.lencooltech.com/blue_dash/btn_again.png" @click="playAgain" />
        </div>
      </section>
    </section>
    <audio
      ref="equipAudio"
      src="https://cdn.lencooltech.com/blue_dash/equip.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="btnAudio"
      src="https://cdn.lencooltech.com/blue_dash/btn.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="holeAudio"
      src="https://cdn.lencooltech.com/blue_dash/holecompress.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="rocketAudio"
      src="https://cdn.lencooltech.com/blue_dash/rocket.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="resultAudio"
      src="https://cdn.lencooltech.com/blue_dash/result.wav"
      preload
      type="audio/mpeg"
    ></audio>
  </div>
</template>

<script src="./HelloWorld.js">

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./HelloWorld.css" scoped>

</style>

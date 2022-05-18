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
        <img class="page-c-dog" @click="clickDog" src="http://imgs.zizaihome.com/04924591-37d4-4d6b-9dd1-f50f21990012.png" ref="pageCDog"/>
        <img class="page-c-hole" ref="hole" src="http://imgs.zizaihome.com/72863c5f-4ed4-4390-962f-252c5e6bc87b.png" />
        <img class="page-c-text1" ref="pageCText1" src="http://imgs.zizaihome.com/b082d74d-f04c-4e64-853e-a54da34e0890.png" />
        <img class="page-c-text2" ref="pageCText2" src="http://imgs.zizaihome.com/50c9f8f9-5082-4b26-9c16-297422b04d63.png"  />
      </section>
      <section class="page-d bg-adaptive" ref="pageD">
        <div class="page-d-guide" ref="pageDGuide" v-if="!hidePageDGuide">
          <div class="page-d-guide-content" @click="clickPageDGuide">
            <img class="page-d-guide-avatar" src="http://imgs.zizaihome.com/f47fec32-2c2e-4e2e-bec8-0143d86d318d.png" />
            <div class="page-d-guide-tips">{{pageDTyper.output}}</div>
            <div class="page-d-guide-continue" ref="pageDGuideContinue">点击继续</div>
          </div>
        </div>
        <div class="page-d-dog-box">
          <img class="page-d-dog" src="http://imgs.zizaihome.com/04924591-37d4-4d6b-9dd1-f50f21990012.png" />
          <img class="page-d-icon" :class="[`page-d-icon-${item.id}`, item.selected ? 'page-d-icon-active' : '']"  :src="item.decor" v-for="(item) in equip" :key="item.id" />
        </div>
        <p class="page-d-icon-tip" :class="[`page-d-icon-tip-${item.id}`]" v-for="(item) in equip" :key="item.descor" :ref="'pageDIconTip' + item.id">{{ item.tips }}</p>
        <div class="equip-box">
          <div class="equip-item" :class="{'equip-item-gray': item.selected}" @click="addEquip(item)" v-for="(item) in equip" :key="item.icon">
            <img :src="item.icon" class="equip" />
          </div>
        </div>
        <div class="page-d-btn" :class="{'page-d-btn-active': setEquip.length === 2}" @click="clickPageDBtn"></div>
      </section>
      <section class="page-e bg-adaptive" ref="pageE">
        <div class="page-e-guide" ref="pageEGuide" v-if="!hidePageEGuide">
          <div class="page-e-guide-content" @click="closePageEGuide">
            <img class="page-d-guide-avatar" src="http://imgs.zizaihome.com/f47fec32-2c2e-4e2e-bec8-0143d86d318d.png" />
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
        <img class="page-f-bg" src="http://imgs.zizaihome.com/06792aa5-89f9-42ce-8f17-b67eec4eb36b.png" />
        <div class="page-f-rocket-box" ref="rocketBox">
          <img class="page-f-rocket" ref="rocket" src="http://imgs.zizaihome.com/221bee14-beed-41b2-bb5d-237af58bfb1d.png" />
          <img class="page-f-hot" ref="hot" src="http://imgs.zizaihome.com/fd072ee4-4544-4d5f-94d1-c8b76ba6794f.png" />
        </div>
        <img class="page-f-fire" ref="fire" src="http://imgs.zizaihome.com/ceebebd4-31ca-44e9-ad76-809b3d6b725b.png" />
      </section>
      <section class="page-g bg-adaptive" ref="pageG">
        <div id="share" class="page-g-share" ref="share">
          <img class="page-g-bg" style="position: absolute;left: 0; top: 0;" src="http://imgs.zizaihome.com/5a23a0f4-fd2c-4885-a638-e95941c9ec60.jpg" />
        </div>
        <button style="position: absolute;left: 0; top: 0;" @click="playAgain">再玩一次</button>
      </section>
    </section>
    <audio
      ref="equipAudio"
      src="http://imgs.zizaihome.com/326426b4-966d-4a6a-b929-b5b1715191bb.wav"
      preload
      type="audio/mpeg"
    ></audio>
    <audio
      ref="btnAudio"
      src="http://imgs.zizaihome.com/bc7895ad-39b3-4a54-a436-2d41f19751aa.wav"
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

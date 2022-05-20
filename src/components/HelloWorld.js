import axios from 'axios';
import EasyTyper from 'easy-typer-js';
import { equip, generateRole } from '../data';

let typeA = null;
let typeA1 = null;  // a页面第二行
let typeA2 = null;  // a页面第三行
let typeD = null, typeD1=null,typeD2=null,typeD3=null;
let typeE = null,typeE1=null,typeE2=null;
let fetchUrl = 'http://miniapp.lencooltech.com/blue_dash/getResult'
export default {
  name: 'HelloWorld',
  data() {
    return {
      showLoading: true,
      currentResolve: 0,
      // id: '',
      pageATyper: {
        output: '',
        isEnd: false,
        speed: 70,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageA1Typer: {
        output: '',
        isEnd: false,
        speed: 70,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageA2Typer: {
        output: '',
        isEnd: false,
        speed: 70,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageALoaded: false,

      isTouchStart: false,
      pageBLoaded: true,
      pageBTimer: null,

      hidePageCGuide: true,
      pageCLoaded: false,

      hidePageDGuide: true,
      pageDLoaded: false,
      pageDoutput: ``,
      pageDTyper: {
        output: '',
        isEnd: false,
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageD1Typer: {
        output: '',
        isEnd: false,
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageD2Typer: {
        output: '',
        isEnd: false,
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageD3Typer: {
        output: '',
        isEnd: false,
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageDTyperClose: false,
      equip,
      setEquip: [],

      hidePageEGuide: false,
      pageELoaded: false,
      pageEoutput: ``,
      pageETyper: {
        output: '',
        isEnd: false,
        speed: 10,  // 70最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageE1Typer: {
        output: '',
        isEnd: false,
        speed: 10,  // 70最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageE2Typer: {
        output: '',
        isEnd: false,
        speed: 10,  // 70最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageETyperClose: false,
      hidePageEMask: true,
      step: 0,

      isPageFLoaded: false,
      pageFRunFinish: false,

      isGenerating: false,
      resultImage: '',
      shareImage: '',
    }
  },
  mounted() {
    // this.renderId();
    let { hole, dog1 } = this.$refs;
    console.log(window.globalData, 'window.globalData')
    let PreloadList = [hole.src, 'http://imgs.zizaihome.com/5a23a0f4-fd2c-4885-a638-e95941c9ec60.jpg', dog1.src, 'http://imgs.zizaihome.com/da00d024-454b-44b7-aafc-bdf758427f9f.png', 'http://imgs.zizaihome.com/a8a4599c-f5ca-4e89-a1bf-82eaea8c5ceb.png', 'http://imgs.zizaihome.com/79c2fc26-3c09-4836-82c3-b8089f19f668.png', 'http://imgs.zizaihome.com/923049db-c320-47dd-8c53-bbe7fbd0071b.png'];

    let promiseAll = [], imgs = [], total = PreloadList.length;
    let This = this;
    for (let i = 0; i < total; i++) {
      promiseAll[i] = new Promise((resolve, reject) => {
        imgs[i] = new Image();
        imgs[i].src = PreloadList[i];
        imgs[i].onload = function() {
          console.log('加载完成', This.currentResolve)
          This.currentResolve++
          resolve(imgs[i]);
        };
      })
    }
    Promise.all(promiseAll).then(img => {
      // 全部图片加载完成
      this.showLoading = false;
    })
    
  },
  computed: {
    nickName () {
      return (window.globalData && window.globalData.nickName) || '未获取';
    },
    id() {
      return (window.globalData && window.globalData.id) || '未获取';
    },
    isShowResult() {
      return this.resultImage && this.pageFRunFinish;
    }
  },
  watch: {
    isPageFLoaded(newVal) {
      if (newVal) {
        this.pageFRun();
      }
    },
    showLoading(newVal) {
      if (!newVal) {
        this.pageAInit();
      }
    },
    isShowResult(newVal) {
      if (newVal) {
        this.pageFfun();
      }
    }
  },
  beforeDestroy() {
    typeA = null;
    typeA1 = null;
    typeA2 = null;
    typeD = null;
    typeE = null;
    this.pageBTimer = null;
    const { audio } = this.$refs;
    audio.pause();
  },
  methods: {
    init() {
      this.pageAInit();
    },
    pageAInit() {
      this.pageALoaded = false;
      this.$refs.pageA.style.opacity = 1;
      this.$refs.pageA.style.zIndex = 999;
      this.initPageAType();
    },
    initPageAType() {
      typeA = null;
      typeA1 = null;
      typeA2 = null;
      typeA = new EasyTyper(this.pageATyper, 'Hi!?你已成功被选为本次', () => {
        typeA1 = new EasyTyper(this.pageA1Typer, '100%BEATS号移⺠计划的', () => {
          typeA2 = new EasyTyper(this.pageA2Typer, `⼀员，你的ID是：${this.id}`, () => {
            this.pageAOnloaded()
          })
        })
      })
    },
    pageAOnloaded() {
      this.pageALoaded = true;
    },
    pageAClick() {
      if (!this.pageALoaded) return;
      this.pageAfun()
    },
    pageBInit() {
      this.pageBLoaded = false;
      this.isTouchStart= false;
      this.$refs.pageB.style.opacity = 1;
      this.$refs.pageB.style.zIndex = 998;
    },
    async clickNailCheck() {
      if (this.isTouchStart) return;
      this.isTouchStart = true;
      await this.transition(this.$refs.nailLine, {
        time: 1500,
        style: {
          top: '0rem',
        }
      })
      await this.transition(this.$refs.nailLine, {
        time: 300,
        style: {
          opacity: 0,
        }
      })
      await this.pageBfun();
    },
    pageCInit() {
      this.$refs.pageC.style.opacity = 1;
      this.$refs.pageC.style.zIndex = 997;
    },
    async clickDog() {
      this.hidePageCGuide = true;
      if (!this.pageCLoaded) return;
      let { holeAudio } = this.$refs;
      this.pageCLoaded = false;
      holeAudio.muted = false;
      holeAudio.play();
      await this.transition(this.$refs.hole, {
        time: 600,
        style: {
          opacity: 1,
          rotateZ: '0deg',
          scale: '1.6',
        }
      })
      this.transition(this.$refs.pageCDog, {
        time: 2000,
        style: {
          rotateZ: '760deg',
          bottom: '23%',
          scale: '.2',
          opacity: 0,
        }
      })
      this.transition(this.$refs.pageCText2, {
        time: 1000,
        style: {
          opacity: 0,
        }
      })
      await this.transition(this.$refs.hole, {
        time: 2000,
        style: {
          // rotateZ: '-1060deg',
          opacity: 0,
        }
      })
      holeAudio.pause();
      await this.pageCfun();
      await this.pageDInit();
    },
    pageDInit() {
      this.hidePageDGuide = false;
      this.pageDTyperClose = false;
      this.setEquip = [];
      this.equip.forEach(equip => {
        equip.selected = false;
      })
      this.$refs.pageD.style.opacity = 1;
      this.$refs.pageD.style.zIndex = 996;
    },
    initPageDType() {
      this.pageDoutput = `欢迎编号${this.id}正式加⼊100%BEATS计划，请从以下列表中选择两件贴⾝物品，准备登舰。`
      //typeD = new EasyTyper(this.pageDTyper, this.pageDoutput, this.pageDOnloaded)
      typeD = new EasyTyper(this.pageDTyper,  `欢迎编号${this.id}正式加⼊100%`, () => {
        typeD1 = new EasyTyper(this.pageD1Typer, 'BEATS计划，', () => {
          typeD2 = new EasyTyper(this.pageD2Typer, `请从以下列表中选择两件贴⾝物品`, () => {
            typeD3 = new EasyTyper(this.pageD3Typer, `，准备登舰。`, () => {
              this.pageDOnloaded();
            })
          })
        })
      })
    },
    pageDOnloaded() {
      this.hidePageDGuide = false;
      this.pageDTyperClose = true;
      this.transition(this.$refs.pageDGuideContinue, {
        time: 400,
        style: {
          opacity: 1,
        }
      })
    },
    async clickPageDGuide() {
      if (!this.pageDTyperClose) return; 
      await this.transition(this.$refs.pageDGuide, {
        time: 400,
        style: {
          opacity: 0,
        }
      })
      this.hidePageDGuide = true;
    },
    async addEquip(equip) {
      let equipAudio = this.$refs.equipAudio;
      equipAudio.muted = false;
      equipAudio.pause();
      equipAudio.currentTime = 0;
      equipAudio.play();
      if (this.setEquip[0] && this.setEquip[0].id === equip.id) {
        this.setEquip[0].selected = false;
        this.setEquip.shift();
        return;
      }
      if (this.setEquip[1] && this.setEquip[1].id === equip.id) {
        this.setEquip[1].selected = false;
        this.setEquip.pop();
        return;
      }

      //设置装备提示语
      for(let i = 1; i<=12; i++) {
        this.transition(this.$refs[`pageDIconTip${i}`], {
          time: 200,
          style: {
            opacity: 0
          }
        })
      }
      this.transition(this.$refs[`pageDIconTip${equip.id}`], {
        time: 300,
        style: {
          opacity: 1,
        }
      })
      if (this.setEquip.length >= 2) {
        this.setEquip[0].selected = false;
        this.setEquip=[this.setEquip[1]];
      }
      equip.selected = true;
      this.setEquip.push(equip);
      equip.selected = true;
      console.log(this.setEquip, 'equip')
    },
    async clickPageDBtn() {
      if (this.setEquip.length < 2) return;
      let role = generateRole[this.setEquip[0].id - 1][this.setEquip[1].id - 1];
      await this.pageDfun();
      await this.pageEInit();
    },

    pageEInit() {
      this.$refs.pageE.style.opacity = 1;
      this.$refs.pageE.style.zIndex = 995;
      this.hidePageEGuide = false;
      this.pageETyperClose = false;
      this.step = 0;
    },
    initPageEType() {
      typeE = null;
      this.pageEoutput = `100%BEATS号准备发射，现在为您准备了⽓氛助燃剂，务必点击饮下，时刻确保进⼊你的最佳状态！`;
      // typeE = new EasyTyper(this.pageETyper, this.pageEoutput, this.pageEOnloaded)
      typeE = new EasyTyper(this.pageETyper, '100%BEATS号准备发射，现在为您准备了⽓氛助燃剂，', () => {
        typeE1 = new EasyTyper(this.pageE1Typer, '务必点击饮下', () => {
          typeE2 = new EasyTyper(this.pageE2Typer, '，时刻确保进⼊你的最佳状态！', () => {
            this.pageEOnloaded();
          })
        })
      })
    },
    async pageEOnloaded() {
      this.hidePageEGuide = false;
      this.pageETyperClose = true;
      await this.transition(this.$refs.pageEGuideContinue, {
        time: 400,
        style: {
          opacity: 1,
        }
      })
    },
    async closePageEGuide() {
      if (!this.pageETyperClose) return;
      // await this.transition(this.$refs.pageEGuide, {
      //   time: 400,
      //   style: {
      //     opacity: 0,
      //   }
      // })
      this.hidePageEGuide = true;
      this.hidePageEMask = false;
    },
    async clickPageECircle() {
      this.hidePageEMask = true;
      if (this.step < 3) {
        this.step++;
      } else {
        this.step = 0;
      }
      let btnAudio = this.$refs.btnAudio;
      btnAudio.muted = false;
      btnAudio.pause();
      btnAudio.currentTime = 0;
      btnAudio.play();
      await this.transition(this.$refs.pageECircle, {
        time: 100,
        style: {
          scale: '.95',
        }
      })
      await this.transition(this.$refs.pageECircle, {
        time: 100,
        style: {
          scale: '1',
        }
      })
    },
    async clickPageEBtn() {
      if (this.isGenerating) return;
      this.isGenerating = true;
      axios({
        url: fetchUrl,
        method: 'get',
        params: {
          id: this.id,
          item1: this.setEquip[0].id - 1,
          item2: this.setEquip[1].id - 1,
          dogState: this.step
        }
      }).then(response => {
        this.isGenerating = false;
        console.log(response, 'response')
        this.resultImage = response.data.data.resultUrl;
        this.shareImage = response.data.data.shareURl;
      }).catch(e => {
        this.resultImage = 'ww.baidu.com'
        this.isGenerating = false;
        console.log('error');
      })

      await this.pageEfun();
      this.isPageFLoaded = true;
    },
    initPageFInit() {
      this.$refs.pageF.style.opacity = 1;
      this.$refs.pageF.style.zIndex = 994;
    },
    async pageFRun() {
      let { rocketAudio } = this.$refs;
      rocketAudio.muted = false;
      rocketAudio.play();
      await this.transition(this.$refs.hot, {
        time: 300,
        style: {
          opacity: 1,
          width: '1.5rem',
          left: '1.125rem',
          height: '1.1rem'
        }
      })
      await this.transition(this.$refs.hot, {
        time: 0,
        style: {
          opacity: 1,
          width: '1rem',
          left: '1.375rem',
          height: '.88rem'
        }
      })
      await this.transition(this.$refs.hot, {
        time: 200,
        style: {
          opacity: 1,
          width: '1.6rem',
          left: '1.125rem',
          height: '1.3rem'
        }
      })

      await this.transition(this.$refs.fire, {
        time: 100,
        style: {
          opacity: 1,
        }
      })
      this.transition(this.$refs.rocketBox, {
        time: 800,
        style: {
          bottom: '8.3rem',
        }
      })
      await this.transition(this.$refs.fire, {
        time: 500,
        style: {
          opacity: 0,
          easing: 'sinOut',
        }
      })
      // 拖时间
      await this.transition(this.$refs.fire, {
        time: 600,
        style: {
          opacity: 0,
          easing: 'sinOut',
        }
      })
      rocketAudio.pause();
      // await this.pageFfun();
      // 火箭运动结束了
      this.pageFRunFinish = true;
    },
    playAgain() {
      // this.init();
      // this.$refs.pageG.style = 0;
      // this.$refs.pageG.style.zIndex = -1;
      window.location.reload();
    },
    async getShareImg() {
      this.$refs.pageH.zIndex = 992;
      this.$refs.pageH.opacity = 1;
      await this.transition(this.$refs.pageG, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: 0
        }
      })
    },
    initPageGInit() {
      this.$refs.pageG.style.opacity = 1;
      this.$refs.pageG.style.zIndex = 993;
    },
    async pageAfun() {
      this.pageBInit();
      await this.transition(this.$refs.pageA, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: 0
        }
      })
      this.pageATyper.output = '';
    },
    async pageBfun() {
      await this.pageCInit();
      await this.transition(this.$refs.pageB, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
      await this.transition(this.$refs.pageCText1, {
        time: 200,
        style: {
          opacity: 1,
        }
      })
      await this.transition(this.$refs.pageCText1, {
        time: 600,
        style: {
          opacity: 0,
        }
      })
      await this.transition(this.$refs.pageCText2, {
        time: 600,
        style: {
          opacity: 1,
        },
        complete: () => {
          this.pageCLoaded = true;
        }
      })
      this.hidePageCGuide = false;
      this.transition(this.$refs.nailLine, {
        time: 10,
        style: {
          opacity: 1,
          top: '-2.48rem'
        }
      })
    },
    async pageCfun() {
      this.pageDInit();
      await this.transition(this.$refs.pageC, {
        time: 200,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
      // 复原页面C初始状态
      this.transition(this.$refs.hole, {
        time: 10,
        style: {
          opacity: 0,
          rotateZ: '10deg'
        }
      })
      this.transition(this.$refs.pageCDog, {
        time: 10,
        style: {
          rotateZ: '0deg',
          scale: '1',
          opacity: 1,
        }
      })
      this.transition(this.$refs.pageCText1, {
        time: 10,
        style: {
          opacity: 0,
        }
      })
      this.transition(this.$refs.pageCText2, {
        time: 10,
        style: {
          opacity: 0,
        }
      })
      this.pageCLoaded = false; 
      await this.initPageDType();
    },
    async pageDfun() {
      this.pageEInit();
      await this.transition(this.$refs.pageD, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
      await this.initPageEType();
      // 复原pageD
      this.pageDTyper.output = '';
      for(let i = 1; i<=12; i++) {
        this.transition(this.$refs[`pageDIconTip${i}`], {
          time: 200,
          style: {
            opacity: 0
          }
        })
      }
    },
    async pageEfun() {
      this.initPageFInit();
      await this.transition(this.$refs.pageE, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
      this.pageETyper.output = '';
    },
    async pageFfun() {
      let { resultAudio } = this.$refs;
      resultAudio.muted = false;
      resultAudio.currentTime = 0;
      resultAudio.play();
      this.initPageGInit();
      await this.transition(this.$refs.pageF, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: -1,
        }
      })
      // 因为之前运动是异步的，可能那边还没有执行完这里就开始跑了，防冲突
      await this.transition(this.$refs.rocketBox, {
        time: 1000,
        style: {
          bottom: '0rem'
        }
      })
      await this.transition(this.$refs.rocketBox, {
        time: 0,
        style: {
          bottom: '0rem',
        }
      })
      await this.transition(this.$refs.hot, {
        time: 0,
        style: {
          opacity: 0,
          width: '1rem',
          height: '.88rem',
          left: '1.375rem',
        }
      })
      await this.transition(this.$refs.fire, {
        time: 0,
        style: {
          opacity: 0
        }
      })
      
      this.isPageFLoaded = false;
    },
    transition (el, options) {
      return new Promise((resolve, reject) => {
        resolve(window.Velocity(el, options.style, {duration: options.time, easing: options.easing || 'linear', complete: options.complete || function() {}}))
      })
    },
    renderId() {
      let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z'];
      let firstNumber = Math.floor(Math.random()* 26)
      let first = letters[firstNumber];
      let secondNumber = Math.floor(Math.random()* 26)
      let second = letters[secondNumber];
      
      let number = Math.floor(Math.random() * 10000);
      // this.id = first + second + number;
      console.log(firstNumber, secondNumber)
    },
  },
}
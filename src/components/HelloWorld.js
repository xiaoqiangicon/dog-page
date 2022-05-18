import axios from 'axios';
import EasyTyper from 'easy-typer-js';
import { equip, generateRole } from '../data';

let typeA = null;
let typeD = null;
let typeE = null;
let fetchUrl = 'http://miniapp.lencooltech.com/blue_dash/getResult'
export default {
  name: 'HelloWorld',
  data() {
    return {
      id: '',
      pageAoutput: ``,
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
      pageALoaded: false,

      pageBLoaded: true,
      pageBTimer: null,

      pageCLoaded: false,

      hidePageDGuide: false,
      pageDLoaded: false,
      pageDoutput: ``,
      pageDTyper: {
        output: '',
        isEnd: false,
        speed: 70,  // 80最佳
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
        speed: 10,  // 80最佳
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause: false
      },
      pageETyperClose: false,
      step: 1,

      isPageFLoaded: false,
    }
  },
  created() {
    this.renderId();
  },
  watch: {
    isPageFLoaded(newVal) {
      if (newVal) {
        this.pageFRun();
      }
    }
  },
  mounted() {
    this.pageAInit();
    // this.pageDInit();
  },
  beforeDestroy() {
    typeA = null;
    typeD = null;
    typeE = null;
    this.pageBTimer = null;
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
      this.pageAoutput = `Hi!?你已成功被选为本次100%BEATS号移⺠计划的⼀员，你的ID是：${this.id}`;
      typeA = new EasyTyper(this.pageATyper, this.pageAoutput, this.pageAOnloaded)
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
      this.$refs.pageB.style.opacity = 1;
      this.$refs.pageB.style.zIndex = 998;
    },
    async clickNailCheck() {
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
      await this.transition(this.$refs.pageCText1, {
        time: 400,
        style: {
          opacity: 1,
        }
      })
      await this.transition(this.$refs.pageCText1, {
        time: 1200,
        style: {
          opacity: 0,
        }
      })
      await this.transition(this.$refs.pageCText2, {
        time: 900,
        style: {
          opacity: 1,
        }
      })
      this.pageCLoaded = true;
    },
    pageCInit() {
      this.$refs.pageC.style.opacity = 1;
      this.$refs.pageC.style.zIndex = 997;
    },
    async clickDog() {
      if (!this.pageCLoaded) return;
      await this.transition(this.$refs.hole, {
        time: 300,
        style: {
          opacity: 1,
          rotateZ: '10deg'
        }
      })
      this.transition(this.$refs.pageCDog, {
        time: 2000,
        style: {
          rotateZ: '760deg',
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
      typeD = new EasyTyper(this.pageDTyper, this.pageDoutput, this.pageDOnloaded)
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
    },
    async clickPageDBtn() {
      if (this.setEquip.length < 2) return;
      let role = generateRole[this.setEquip[0].id - 1][this.setEquip[1].id - 1];
      console.log(this.setEquip[0].id, this.setEquip[1].id, 'role', role.name);
      await this.pageDfun();
      await this.pageEInit();
    },

    pageEInit() {
      this.$refs.pageE.style.opacity = 1;
      this.$refs.pageE.style.zIndex = 995;
      this.hidePageEGuide = false;
      this.pageETyperClose = false;
      this.step = 1;
    },
    initPageEType() {
      typeE = null;
      this.pageEoutput = `100%BEATS号准备发射，现在为您准备了⽓氛助燃剂，务必点击饮下，时刻确保进⼊你的最佳状态！`;
      typeE = new EasyTyper(this.pageETyper, this.pageEoutput, this.pageEOnloaded)
    },
    pageEOnloaded() {
      this.hidePageEGuide = false;
      this.pageETyperClose = true;
      this.transition(this.$refs.pageEGuideContinue, {
        time: 400,
        style: {
          opacity: 1,
        }
      })
    },
    async closePageEGuide() {
      if (!this.pageETyperClose) return;
      await this.transition(this.$refs.pageEGuide, {
        time: 400,
        style: {
          opacity: 0,
        }
      })
      this.hidePageEGuide = true;
    },
    async clickPageECircle() {
      if (this.step < 3) {
        this.step++;
      } else {
        this.step = 0;
      }
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
      await this.pageEfun();
      this.isPageFLoaded = true;
      axios({
        url: fetchUrl,
        method: 'get',
        params: {
          id: window.globalData.id,
          item1: this.setEquip[0].id - 1,
          item2: this.setEquip[1].id - 1,
          dogState: this.step
        }
      }).then(response => {
        console.log(response, 'response')
      })
      .catch(error => {
        Indicator.close();
        console.log('error' + error);
      });
    },
    initPageFInit() {
      this.$refs.pageF.style.opacity = 1;
      this.$refs.pageF.style.zIndex = 994;
    },
    async pageFRun() {
      await this.transition(this.$refs.hot, {
        time: 1000,
        style: {
          scale: '1.2',
        }
      })
      await this.transition(this.$refs.fire, {
        time: 500,
        style: {
          opacity: 1,
        }
      })
      await this.transition(this.$refs.rocketBox, {
        time: 3000,
        style: {
          bottom: '8.3rem'
        }
      })
      await this.transition(this.$refs.fire, {
        time: 500,
        style: {
          opacity: 0
        }
      })
      await this.pageFfun();

      // 复原火箭初始状态
      this.isPageFLoaded = false;
    },
    playAgain() {
      this.init();
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
      this.pageCInit();
      await this.transition(this.$refs.pageB, {
        time: 500,
        style: {
          opacity: 0,
          zIndex: -1
        }
      })
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
      this.initPageGInit();
      await this.transition(this.$refs.pageF, {
        time: 200,
        style: {
          opacity: 0,
          zIndex: -1,
        }
      })
      this.transition(this.$refs.hot, {
        time: 10,
        style: {
          scale: '1',
        }
      })
      this.transition(this.$refs.rocketBox, {
        time: 10,
        style: {
          bottom: '0rem'
        }
      })
      this.transition(this.$refs.fire, {
        time: 10,
        style: {
          opacity: 0
        }
      })
    },
    transition (el, options) {
      return new Promise((resolve, reject) => {
        resolve(window.Velocity(el, options.style, options.time))
      })
    },
    renderId() {
      let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z'];
      let firstNumber = Math.floor(Math.random()* 26)
      let first = letters[firstNumber];
      let secondNumber = Math.floor(Math.random()* 26)
      let second = letters[secondNumber];
      
      let number = Math.floor(Math.random() * 10000);
      this.id = first + second + number;
      console.log(firstNumber, secondNumber)
    },
  },
}